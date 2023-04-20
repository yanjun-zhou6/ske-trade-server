import { Subject } from 'rxjs'
import { filter, scan } from 'rxjs/operators'
import { WebSocket } from 'ws'
import { base64encode } from 'nodejs-base64'
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

  const notify = (data: any) => {
    console.log('data', data)
    wss.forEach((ws) => ws.send(base64encode(JSON.stringify(data))))
  }

  return {
    subscribe,
    notify,
  }
}

export default ModifyObserver
