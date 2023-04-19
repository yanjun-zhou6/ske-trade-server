import { WebSocketServer } from 'ws'
import controller from './controller'
import { onConnect } from './rxws'

const startServer = (port: number) => {
  const server = new WebSocketServer({ port })
  server.on('connection', onConnect(controller))

  return server
}

export default startServer
