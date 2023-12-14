import { CacheService, Controller, CreateAST2OpenAPI, HttpGet, Injection } from '@wangminghua/koa-restful'

// import { isDevelopment } from '../utils/share'
// 生产环境使用时屏蔽 swagger 设置 请设置 enabled: isDevelopment()
@Controller('/swagger', { prefix: '', enabled: true })
export class SwaggerController {
    @Injection()
    cache!: CacheService

    @HttpGet('')
    index() {
        return `<!DOCTYPE html>
<html>
<head>
  <title>Swagger UI</title>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.3/swagger-ui.min.css">
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.3/swagger-ui-bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.3/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {

      const ui = SwaggerUIBundle({
        url: '/swagger/json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      })
    }
  </script>
</body>
</html>`
    }
    @HttpGet()
    async json(): Promise<any> {
        const result = await this.cache.get(`sys:${SwaggerController.name}:json`, () => {
            const openapi = CreateAST2OpenAPI('src/service/*.ts')
            const parseStr = openapi.parse()
            return JSON.parse(parseStr)
        })

        return result
    }
}
