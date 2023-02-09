import { spawn } from 'child_process'

export default async (command: string, path: string) => {
    const [cmd, ...args] = command.split(' ')
    return new Promise((resolve, reject) => {
        const app = spawn(cmd, args, {
            cwd: path,
            stdio: 'inherit',
            shell: false //mac不需要开启，windows下git base需要开启支持
        })
        app.on('close', resolve)
    })
}