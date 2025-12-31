import { test as testBase } from 'vitest'
import { SetupWorker, setupWorker } from 'msw/browser'
import { ws } from 'msw'
import type { WebSocketClientConnectionProtocol } from '@mswjs/interceptors/WebSocket'

let port = 43692
const worker = setupWorker()
const wsMock = ws.link(`ws://localhost:${port}`)

export default testBase.extend<{
  worker: SetupWorker
}>({
  worker: [
    async ({}, use) => {
      // Start the worker before the test.
      await worker.start({quiet: true})

      await use(worker)

      // Remove any request handlers added in individual test cases.
      // This prevents them from affecting unrelated tests.
      worker.resetHandlers()

      // Stop the worker after the test.
      worker.stop()
    },
    {
      auto: true,
      scope: 'test',
    },
  ]
})

export const websocketClient = (worker: SetupWorker) => {
  const messages: string[] = []
  return {
    messages,
    client: new Promise<WebSocketClientConnectionProtocol>((resolve, reject) => {
      worker.use(
        wsMock.addEventListener('connection', ({client}) => {
          client.addEventListener('message', (event) => {
            messages.push(event.data.toString())
          })
          client.addEventListener('close', (event) => {})
          resolve(client)
        })
      )
    }),
    port
  }
}