import { connect } from './db'
import config from './config'
// import { initTrades } from './db/init-trades'
import startServer from './socket-server'
import { modifyProcessObservable } from './jobs/process'
import ModifyObserver from './jobs/modify-observer'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  await connect(config.db)
  // await initTrades(config.initTraderNumber)
  const modifyObserver = ModifyObserver()
  startServer(config.port, modifyObserver.subscribe())
  modifyProcessObservable.subscribe(modifyObserver.notify)
})()
