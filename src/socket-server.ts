import { WebSocketServer } from 'ws'
import controller from './controller'
import { onConnect, EventSubject } from './rxws'

const startServer = (port: number, eventSubject?: EventSubject) => {
  const server = new WebSocketServer({ port })
  server.on('connection', onConnect(controller, eventSubject))

  return server
}

export default startServer
