import { createServer } from '../src/server'
import Hapi from '@hapi/hapi'

describe('Status plugin', () => {
  let server: Hapi.Server

  beforeAll(async () => {
    server = await createServer()
  })

  afterAll(async () => {
    await server.stop()
  })

  test('status endpoint return 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    const response = JSON.parse(res.payload)
    expect (res.statusCode).toEqual(200)
    expect (response.up).toEqual(true)
  })
})