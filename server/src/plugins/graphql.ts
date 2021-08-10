import Hapi from '@hapi/hapi'

const graphqlPlugin: Hapi.Plugin<undefined> = {
  name: 'app/graphql',
  register: async function(server: Hapi.Server) {
    server.route({
      method: 'GET',
      path: '/graphql',
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h.response().code(200)
      }
    })
  }
}

export default graphqlPlugin