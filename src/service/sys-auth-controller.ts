import { Controller, HttpGet, Injection, LoggerService } from '@wangminghua/koa-restful'

/**
 * 认证服务
 */
@Controller()
export class SysAuthController {
    @Injection()
    logger?: LoggerService

    /**
     * 测试接口
     * @returns
     */
    @HttpGet()
    test() {
        this.logger?.info('1111')
        return {
            name: 123,
        }
    }
}
