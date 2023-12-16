import { swagger2html } from '@wangminghua/koa-restful-extra'
import fs from 'fs'
import { join } from 'path'

const html = swagger2html('src/service/*.ts')
const dir = 'static/swagger'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

fs.writeFileSync(join(dir, 'index.html'), html, { encoding: 'utf-8' })
