import { Observable } from 'rxjs'
import { fork } from 'child_process'
import { join } from 'path'

export const startModifyProcess = () =>
  process.env.NODE_ENV === 'development'
    ? fork(join(__dirname, './modify-job.ts'), [], {
        execPath: 'babel-node',
        execArgv: ['--extensions', '.ts'],
      })
    : fork(join(__dirname, './modify-job.js'))

export const modifyProcessObservable = new Observable((subscriber) => {
  const modifyProcess = startModifyProcess()
  modifyProcess.on('message', (data) => {
    console.log(data)
    subscriber.next(data)
  })
})
