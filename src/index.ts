import { connect } from './db'
import config from './config'
import startServer from './socket-server'
import { modifyProcessObservable } from './jobs/process'
import ModifySubject from './jobs/modify-subject'
;(async () => {
  try {
    await connect(config.db)
    const modifySubject = ModifySubject()
    const server = startServer(config.port, modifySubject.subscribe())
    // update trades automatically in another process
    if (process.env.MODIFY_JOB === 'true') {
      const modifyProcessSubscription = modifyProcessObservable.subscribe(
        modifySubject.notify,
      )
      server.on('close', modifyProcessSubscription.unsubscribe)
    }

    console.log('websock is listenning on port:', 8080)
  } catch (e) {
    console.error(e)
  }
})()
