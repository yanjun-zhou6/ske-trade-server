import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { WebSocket } from 'ws'
import { base64encode } from 'nodejs-base64'
import { EventSubject } from '../rxws'

const ModifyObserver = () => {
  let wss: WebSocket[] = []
  const eventSubject: EventSubject = new Subject()

  const subscribe = () => {
    eventSubject
      .pipe(filter(({ eventType }) => eventType === 'getTrades'))
      .subscribe(({ ws }) => {
        if (!wss.find((matchWs) => matchWs === ws)) {
          ws.on('close', () => {
            wss = wss.filter((matchWs) => matchWs !== ws)
          })

          wss.push(ws)
        }
      })

    return eventSubject
  }

  const notify = (data: any) => {
    wss.forEach((ws) => ws.send(base64encode(JSON.stringify(data))))
  }

  return {
    subscribe,
    notify,
  }
}

export default ModifyObserver
