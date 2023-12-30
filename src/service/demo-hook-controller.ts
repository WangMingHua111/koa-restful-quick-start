import { AddGlobalHook, Aspect, Controller, HttpGet } from '@wangminghua/koa-restful'

AddGlobalHook(
  async (ctx) => {
    console.log('全局前置钩子 Hook>>>', `${Date.now()} ${ctx.URL}`)
  },
  {
    hookType: 'globalBeforeHook',
  }
)

AddGlobalHook(
  async (ctx) => {
    console.log('全局后置钩子 Hook>>>', `${Date.now()} ${ctx.body}`)
  },
  {
    hookType: 'globalAfterHook',
  }
)

/**
 * Hook服务
 */
@Controller()
export class HookController {
  /**
   * 测试接口，带查询参数
   * @returns
   */
  @Aspect(async (ctx) => {
    console.log('前置钩子 Aspect>>>', `${Date.now()} ${ctx.URL}`)
  })
  @Aspect(
    async (ctx) => {
      console.log('后置钩子 Aspect>>>', `${Date.now()} ${ctx.URL}`)
    },
    {
      hookType: 'afterHook',
    }
  )
  @HttpGet()
  test(): string {
    return new Date().toLocaleString()
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
