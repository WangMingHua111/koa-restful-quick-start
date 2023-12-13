import { AddDependency, ConsoleLoggerService, LoggerService } from '@wangminghua/koa-restful'

AddDependency(new ConsoleLoggerService(), { alias: [LoggerService] })
