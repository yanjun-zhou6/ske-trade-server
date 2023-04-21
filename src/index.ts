import { connect } from './db'
import config from './config'
import startServer from './socket-server'
import { modifyProcessObservable } from './jobs/process'
import ModifyObserver from './jobs/modify-observer'
;(async () => {
  try {
    await connect(config.db)
    const modifyObserver = ModifyObserver()
    const server = startServer(config.port, modifyObserver.subscribe())
    // update trades automatically in another process
    if (process.env.MODIFY_JOB === 'true') {
      const modifyProcessSubscription = modifyProcessObservable.subscribe(
        modifyObserver.notify,
      )
      server.on('close', modifyProcessSubscription.unsubscribe)
    }

    console.log('websock is listenning on port:', 8080)
  } catch (e) {
    console.error(e)
  }
})()
