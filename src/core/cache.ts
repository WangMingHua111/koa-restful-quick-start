import { AddDependency, CacheService, MemoryCacheService } from '@wangminghua/koa-restful'

AddDependency(new MemoryCacheService(), { alias: [CacheService] })
