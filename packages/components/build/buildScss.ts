import cpy from 'cpy'
import { resolve, dirname } from 'path'
import { promises as fs } from "fs"

import sass from "sass"
import glob from "fast-glob"

const sourceDir = resolve(__dirname, '../src')
const targetLib = resolve(__dirname, '../snail-admin/lib/src')
const targetEs = resolve(__dirname, '../snail-admin/es/src')

const buildScss = async () => {
    await cpy(`${sourceDir}/**/*.scss`, targetLib)
    await cpy(`${sourceDir}/**/*.scss`, targetEs)

    const scssFils = await glob("**/*.scss", { cwd: sourceDir, onlyFiles: true })
    for (let path in scssFils) {
        const filePath = `${sourceDir}/${scssFils[path]}`
        const code = await sass.compileAsync(filePath)
        const cssPath = scssFils[path].replace('.scss', '.css')
        await fs.writeFile(resolve(targetLib, cssPath), code.css)
        await fs.writeFile(resolve(targetEs, cssPath), code.css)
    }
}
buildScss()
