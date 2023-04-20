import { Subject } from 'rxjs'
import { filter, scan } from 'rxjs/operators'
import { WebSocket } from 'ws'
import { EventSubject } from '../rxws'

const ModifyObserver = () => {
  const wss: WebSocket[] = []
  const eventSubject: EventSubject = new Subject()

  const subscribe = () => {
    eventSubject.pipe(
      filter(({ event }) => event === 'getTrades'),
      scan((acc, { ws }) => {
        if (!wss.find((matchWs) => matchWs === ws)) {
          acc.push(ws)
        }
        return acc
      }, wss),
    )

    return eventSubject
  }

  return {
    subscribe,
  }
}

export default ModifyObserver
