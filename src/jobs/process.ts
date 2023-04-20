import { Observable } from 'rxjs'
import { fork } from 'child_process'
import { join } from 'path'

export const startModifyProcess = () =>
  fork(join(__dirname, './modify-job.ts'), [], {
    execPath: 'babel-node',
    execArgv: ['--extensions', '.ts'],
  })

export const modifyProcessObservable = new Observable((subscriber) => {
  const modifyProcess = startModifyProcess()
  modifyProcess.on('message', (data) => {
    subscriber.next(data)
  })
})
