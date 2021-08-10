import { ApolloServer, gql } from 'apollo-server-hapi'
import Hapi from '@hapi/hapi'
import statusPlugin from './plugins/status'
import { schema } from './schema'
import { context } from './context'

const app: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost'
})

export async function createServer(): Promise<Hapi.Server> {
  // init hapi
  await app.register([
    statusPlugin, 
  ])
  await app.initialize()

  // init apollo
  const server = new ApolloServer({
    schema,
    context
  });
  await server.start()
  await server.applyMiddleware({
    app,
  })

  return app
}

export async function startServer(): Promise<Hapi.Server> {

  await app.start()
  console.log(`Server running on ${app.info.uri} 🚀`)
  return app
}

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})
