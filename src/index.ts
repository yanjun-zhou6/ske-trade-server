import { connect } from './db'
import config from './config'
import { initTrades } from './db/init-trades'
import startServer from './socket-server'
import { startModifyProcess } from './jobs/process'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  await connect(config.db)
  await initTrades(config.initTraderNumber)
  startServer(config.port)
  startModifyProcess()
})()
