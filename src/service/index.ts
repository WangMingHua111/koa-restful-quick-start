// import { globSync } from 'glob'
// import * as path from 'path'

// const files = globSync(['**/*-controller.ts'], { cwd: __dirname })

// // 自动导入所有控制器
// files.forEach(async (f) => {
//     // console.log(`import ${path.resolve(__dirname, f)}`)
//     await import(path.resolve(__dirname, f))
// })

import './demo-auth-controller'
import './demo-controller'
import './demo-hook-controller'
