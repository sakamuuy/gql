import Hapi from '@hapi/hapi'
import Joi from 'joi'
import Boom from '@hapi/boom'

const coursesPlugin = {
  name: 'app/courses',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/courses/{courseId}',
        options: {
          validate: {
            params: Joi.object({
              courseId: Joi.number().integer(),
            }),
            failAction: (_, __, err) => {
              throw err
            }
          }
        }
      }
    ])
  }
}