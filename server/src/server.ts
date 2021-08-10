import Hapi from '@hapi/hapi'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import prismaPlugin from './plugins/prisma'
import statusPlugin from './plugins/status'
import usersPlugin from './plugins/users'
import emailPlugin from './plugins/email'
import authPlugin from './plugins/auth'

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost'
})

export async function createServer(): Promise<Hapi.Server> {
  await server.register([
    statusPlugin, 
    prismaPlugin, 
    usersPlugin,
    emailPlugin,
    hapiAuthJwt2,
    authPlugin
  ])
  await server.initialize()

  return server
}

export async function startServer(): Promise<Hapi.Server> {
  await server.start()
  console.log(`Server running on ${server.info.uri} 🚀`)
  return server
}

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})
