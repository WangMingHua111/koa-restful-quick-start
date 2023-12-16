import { Authorize, CacheService, Controller, FromBody, FromHeader, FromQuery, FromRoute, HttpDelete, HttpGet, HttpHead, HttpOptions, HttpPatch, HttpPost, HttpPut, Injection, LoggerService } from '@wangminghua/koa-restful'
import { CookieAuthorization, JwtBearerAuthorization, SimpleAuthorize } from '@wangminghua/koa-restful-extra'
import { Context } from 'koa'

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

    @Injection()
    bearer!: JwtBearerAuthorization

    @Injection()
    cookie?: CookieAuthorization

    /**
     * 执行登录
     * @param ctx
     * @returns
     */
    @HttpGet()
    login(ctx: Context) {
        const token = this.bearer.sign({
            data: new Date().toLocaleString(),
        })
        // 如果有 cookie 鉴权，写入cookie
        if (this.cookie) {
            const cookieToen = this.cookie.sign({
                data: new Date().toLocaleString(),
            })
            ctx.cookies.set(this.cookie.authorityHeader, cookieToen)
        }
        return token
    }

    /**
     * 测试Authorize
     * @returns
     */
    @Authorize()
    @HttpGet()
    auth() {
        return new Date().toLocaleString()
    }

    /**
     * 测试SimpleAuthorize
     * @returns
     */
    @SimpleAuthorize(['Bearer', 'Cookie'])
    @HttpGet()
    auth2() {
        return new Date().toLocaleString()
    }

    /**
     * 测试接口，带查询参数
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
     * 路由参数和请求头参数
     * @param body
     * @returns
     */
    @HttpGet('test2/:id')
    test2(@FromRoute() id: string, @FromHeader() name: string = 'hipy') {
        return {
            id,
            name,
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
