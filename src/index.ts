import KoaRestful from '@wangminghua/koa-restful'
import chalk from 'chalk'
import Koa from 'koa'
import KoaStatic from 'koa-static'

import './core' // 加载核心
import './service' // 加载api服务

import { allIPs, isDevelopment } from './utils/share'

const port = process.env.PORT || 3000

const koa = new Koa()
koa.use(KoaRestful({ logs: true }))
koa.use(KoaStatic('./static'))
koa.listen(port)

const ips = allIPs()
if (ips.length > 0) {
    console.group(chalk.green('\n💥服务启动成功：'))
    for (const ip of ips) {
        console.log(chalk.yellow(`http://${ip}:${port}${isDevelopment() ? '/swagger' : ''}`))
    }
    console.groupEnd()
} else {
    console.log(chalk.red('当前系统的无有效的IP地址'))
    process.exit(1)
}
