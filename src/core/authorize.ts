import { AddAuthentication } from '@wangminghua/koa-restful'

AddAuthentication('Bearer', {
    async hook(ctx) {
        const success = Math.random() < 0.5 // 生成随机认证结果，50%的几率不能通过认证

        return success
    },
})
