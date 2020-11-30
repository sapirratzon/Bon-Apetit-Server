const Handler = require('./Handler')

async function routes(fastify, options) {
    const handler = new Handler(fastify)
    const { users, user, register } = require('./Schema')

    fastify.get('/', users, handler.getAll)
    fastify.get('/:id/userRecipes', {}, handler.getUserRecipes())
    fastify.post('/:id/addRecipe', {}, handler.addRecipe)
    // just as an example, specific user get will only work if you provide a token (ex. its users only content)
    fastify.get('/:id', { schema: user.schema, preHandler: fastify.authenticate }, handler.get)
    fastify.post('/register', register, handler.register)
}

module.exports = routes