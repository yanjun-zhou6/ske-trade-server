import mongoose from 'mongoose'
import startServer from '../../src/socket-server'
import { connect } from '../../src/db'
import config from '../../src/config'
import WebSocketClient, { Server, WebSocket } from 'ws'
import { base64encode, base64decode } from 'nodejs-base64'

async function waitForSocketState(
  socket: WebSocketClient,
  state: WebSocket['readyState'],
) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
  return await new Promise<void>(async function (resolve) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (socket.readyState === state) {
      resolve()
    } else {
      await waitForSocketState(socket, state).then(resolve)
    }
  })
}

let server: Server<WebSocket>
beforeAll(async () => {
  await connect(config.db)
  server = startServer(config.port)
})

afterAll(async () => {
  server.close()
  await mongoose.connection.close()
})

test('test getTrades', async () => {
  const client = new WebSocketClient(`ws://localhost:${config.port}`)
  await waitForSocketState(client, client.OPEN)

  const testMessage = {
    eventType: 'getTrades',
    page: 1,
    amount: 10,
  }
  let responseMessage = { data: { totolAmount: 0 } }
  client.on('message', (data) => {
    responseMessage = JSON.parse(
      base64decode(
        Buffer.from(
          data as WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>,
        ).toString(),
      ),
    )
    client.close()
  })

  client.send(base64encode(JSON.stringify(testMessage)))
  await waitForSocketState(client, client.CLOSED)
  expect(responseMessage.data.totolAmount).toBe(100)
})
