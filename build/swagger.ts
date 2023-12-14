import { CreateAST2OpenAPI } from '@wangminghua/koa-restful'
import fs from 'fs'
import { join } from 'path'

const openapi = CreateAST2OpenAPI('src/service/*.ts')
const parseStr = openapi.parse()

const html = `<!DOCTYPE html>
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
        spec: $spec,
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
</html>`.replace('$spec', parseStr)

const dir = 'static/swagger'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

fs.writeFileSync(join(dir, 'index.html'), html, { encoding: 'utf-8' })
