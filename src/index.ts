import { connect } from './db'
import config from './config'
import { initData } from './db/init-trades'
import startServer from './socket-server'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  await connect(config.db)
  await initData(config.initTraderNumber)
  startServer(config.port)
})()
