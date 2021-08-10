import Boom from '@hapi/boom'
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
        path: '/login',
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

  try {
    const createdToken = await prisma.token.create({
      data: {
        emailToken,
        type: TokenType.EMAIL,
        expiration: tokenExpiration,
        user: {
          connectOrCreate: {
            create: {
              email
            },
            where: {
              email
            }
          }
        }
      }
    })
console.log('hoge')
    await sendEmailToken(email, emailToken)
    return h.response({ token: createdToken }).code(200)
  } catch (error) {
    return Boom.badImplementation(error.message)
  }
}

function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}