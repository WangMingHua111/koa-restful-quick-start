import './env' // 加载环境变量

import { AddConsoleLoggerService, AddJwtBearerAuthentication, AddMemoryCacheService, AddSwaggerUI } from '@wangminghua/koa-restful-extra'

AddConsoleLoggerService() // 加载日志服务
// 加载身份认证服务
AddJwtBearerAuthentication({
    secret: process.env.NODE_AUTHENTICATION_SECRET || '',
})
AddMemoryCacheService() // 加载缓存服务
AddSwaggerUI() // 加载swagger服务
