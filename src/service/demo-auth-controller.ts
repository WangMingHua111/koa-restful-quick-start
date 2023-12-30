import { Authorize, Controller, HttpGet, Injection } from '@wangminghua/koa-restful'
import { BaseController, CookieAuthorization, JwtBearerAuthorization, SimpleAuthorize } from '@wangminghua/koa-restful/extra'
import { Context } from 'koa'

/**
 * 身份认证Demo，注意：由于codesandbox沙箱因素，将导致 cookie 不能被正确写入，请复制沙箱地址到浏览器测试
 */
@Controller()
export class AuthDemoController {
  @Injection()
  bearer: JwtBearerAuthorization

  @Injection()
  cookie?: CookieAuthorization

  /**
   * 执行登录，自动写入cookie认证信息
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
   * 测试Authorize，调用默认Bearer认证，返回401
   * @returns
   */
  @Authorize()
  @HttpGet()
  auth() {
    return new Date().toLocaleString()
  }

  /**
   * 测试SimpleAuthorize，调用Bearer认证，返回401
   * @returns
   */
  @SimpleAuthorize('Bearer')
  @HttpGet()
  auth2() {
    return new Date().toLocaleString()
  }

  /**
   * 测试SimpleAuthorize，调用默认Cookie认证，返回200
   * @returns
   */
  @SimpleAuthorize('Cookie')
  @HttpGet()
  auth3() {
    return new Date().toLocaleString()
  }

  /**
   * 测试SimpleAuthorize，调用默认Bearer或Cookie认证，返回200
   * @returns
   */
  @SimpleAuthorize(['Bearer', 'Cookie'])
  @HttpGet()
  auth4() {
    return new Date().toLocaleString()
  }
}

/**
 * 身份认证Demo2，在控制器添加了认证方法后，请求函数不需要再添加 身份认证装饰器
 */
@SimpleAuthorize(['Bearer', 'Cookie'])
@Controller()
export class AuthDemo2Controller extends BaseController {
  @Injection()
  cookie: CookieAuthorization

  @HttpGet()
  auth() {
    return new Date().toLocaleString()
  }
  /**
   * 返回 403 状态码
   * @returns
   */
  @HttpGet()
  auth2() {
    this.forbidden()
  }

  @HttpGet()
  token() {
    return this.readToken()
  }

  @HttpGet()
  claims() {
    return this.readClaims()
  }

  /**
   * 读取令牌
   * @param ctx
   * @returns
   */
  @HttpGet()
  readToken2(ctx) {
    return this.cookie.token(ctx)
  }
  /**
   * 读取验证主体特征
   * @returns
   */
  @HttpGet()
  async readClaims2() {
    return await this.cookie.claims(this.ctx)
  }
}
