import Hapi from '@hapi/hapi'
import { TokenType, UserRole } from '@prisma/client'
import { add } from 'date-fns'
import Joi from 'joi'

const authPlugin: Hapi.Plugin<null> = {
  name: 'app/auth',
  dependencies: ['prisma', 'hapi-auth-jwt2', 'app/email'],
  register: async function (server:Hapi.Server) {
    // Todo: Add the authentication strategy
    server.route([
      {
        method: 'POST',
        path: 'login',
        handler: loginHandler,
        options: {
          auth: false,
          validate: {
            payload: Joi.object({
              email: Joi.string().email().required()
            })
          }
        }
      }
    ])
  }
}

export default authPlugin

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10

interface LoginInput {
  email: string
}

async function loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma, sendEmailToken } = request.server.app
  const { email } = request.payload as LoginInput
  const emailToken = generateEmailToken()
  const tokenExpiration = add(new Date(), {
    minutes: EMAIL_TOKEN_EXPIRATION_MINUTES
  })
}

function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}