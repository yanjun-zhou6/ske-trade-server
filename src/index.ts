import { WebSocketServer } from 'ws'
import { onConnect } from './rxws'
import controller from './controller'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', onConnect(controller))
