import { CacheService, Controller, FromBody, FromQuery, HttpDelete, HttpGet, HttpHead, HttpOptions, HttpPatch, HttpPost, HttpPut, Injection, LoggerService } from '@wangminghua/koa-restful'

/**
 * Demo服务
 */
@Controller()
export class DemoController {
    /**
     * 日志
     */
    @Injection()
    logger!: LoggerService
    /**
     * 缓存
     */
    @Injection()
    cache!: CacheService

    /**
     * 测试接口
     * @returns
     */
    @HttpGet()
    @HttpPost()
    @HttpPut()
    @HttpDelete()
    @HttpHead()
    @HttpPatch()
    @HttpOptions()
    async test(@FromQuery() name: string = 'hello'): Promise<TestModel> {
        const localeTime = await this.cache.get('localeTime', async () => {
            const locale = new Date().toLocaleString()
            return locale
        })

        this.logger?.info(`localeTime >>> ${localeTime}`)

        return {
            name: name,
            value: 99,
        }
    }
    /**
     * 提交body
     * @param body
     * @returns
     */
    @HttpPost()
    test1(@FromBody() body: TestModel) {
        return {
            ...body,
            name: 'hello ' + body.name,
        }
    }
    /**
     * 清理缓存
     * @param cacheKey 缓存Key
     */
    @HttpPost()
    cleanCache(@FromQuery() cacheKey = 'localeTime') {
        this.cache.delete(cacheKey)
    }
}

/**
 * 测试模型
 */
interface TestModel {
    /**
     * 名称
     */
    name: string
    /**
     * 数据值
     */
    value: number
}
