const isEmail = require('validator/lib/isEmail')

function model(fastify) {
    try {
        // return already-compiled User model if it exists, throw an error otherwise
        return fastify.mongoose.model('User')
    } catch (err) {
        // define, compile and return User model if it doesnt exist
        const schema = fastify.mongoose.Schema({
            username: { type: String, required: true, minlength: 3, maxlength: 10 },
            first_name: { type: String, required: true, minlength: 2, maxlength: 20 },
            last_name: { type: String, required: true, minlength: 2, maxlength: 20 },
            email: { type: String, required: true, unique: true, index: true, validate: { validator: isEmail, message: 'Invalid email' } },
            password: { type: String, required: true, minlength: 5 },
            country: { type: String, required: true, minlength: 2, maxlength: 30 },
            recipes: [{ type: fastify.mongoose.Schema.Types.ObjectId, ref: 'Recipe', unique: true }],
        }, { timestamps: true })

        schema.set('toJSON', {
            transform: (doc, user) => {
                user.username = user.username.toString()
                delete user.password
            }
        })

        return fastify.mongoose.model('User', schema)
    }
}

module.exports = model