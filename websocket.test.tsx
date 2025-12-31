import { expect, test as baseTest, describe } from 'vitest'
import { default as test, websocketClient } from './mswWorker.js'

describe('validate msw & vitest & websockets', () => {
  test('once', async ({worker}) => {
    const {client, port} = websocketClient(worker)

    const openPromise = new Promise((resolve) => {
      const socket = new WebSocket(`ws://localhost:${port}`)
      socket.onopen = () => {
        resolve(true)
      }
    })

    await expect(await openPromise).toEqual(true)
  })

  test('twice', async ({worker}) => {
    const {client, port} = websocketClient(worker)

    const openPromise = new Promise((resolve) => {
      const socket = new WebSocket(`ws://localhost:${port}`)
      socket.onopen = () => {
        resolve(true)
      }
    })

    await expect(await openPromise).toEqual(true)
  })
})