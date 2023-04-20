import { Observable, Subject, from } from 'rxjs'
import { base64decode, base64encode } from 'nodejs-base64'
import { mergeAll, filter } from 'rxjs/operators'
import { WebSocket } from 'ws'

export interface Controller {
  (rootObservable: Observable<Message>): Observable<unknown>
}

export interface Message {
  eventType: string
  [key: string]: unknown
}

export type EventSubject = Subject<{ eventType: string; ws: WebSocket }>

export const onConnect = (
  controller: Controller,
  eventSubject?: EventSubject,
): ((ws: WebSocket) => void) => {
  return (ws: WebSocket): void => {
    const rootSubject = new Subject<Message>()
    const rootControllerObservable = controller(rootSubject.asObservable())

    rootControllerObservable.subscribe({
      next: (response) => {
        ws.send(base64encode(JSON.stringify(response)))
      },
      error: console.error,
    })

    ws.on('message', (data) => {
      const message = JSON.parse(
        base64decode(
          Buffer.from(
            data as WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>,
          ).toString(),
        ),
      ) as Message
      eventSubject?.next({ eventType: message.eventType, ws })
      rootSubject.next(message)
    })

    ws.on('error', console.error)
  }
}

export const ofType = (eventType: string) => {
  return (observable$: Observable<Message>) =>
    observable$.pipe(
      filter(({ eventType: targetEventType }) => targetEventType === eventType),
    )
}

export const composeControllers =
  (...controllers: Controller[]) =>
  (rootObservable: Observable<Message>) => {
    const controllerObservables = controllers.map((controller) =>
      controller(rootObservable),
    )

    return from(controllerObservables).pipe(mergeAll())
  }
