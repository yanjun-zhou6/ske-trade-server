import { fork } from 'child_process'
import { join } from 'path'

export const startModifyProcess = () =>
  fork(join(__dirname, './modify-job.ts'), [], {
    execPath: 'babel-node',
    execArgv: ['--extensions', '.ts'],
  })
