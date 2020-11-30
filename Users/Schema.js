// const _id = { type: 'string', minLength: 15 }
const username = { type: 'string', minLength: 3, maxLength: 10 }
const password = { type: 'string', minLength: 5, maxLength: 10 }
const first_name = { type: 'string', minLength: 2, maxLength: 20 }
const last_name = { type: 'string', minLength: 2, maxLength: 20 }
const country = { type: 'string', minLength: 2, maxLength: 30 }
const email = { type: 'string', minLength: 5, maxLength: 100 }



const userProps = {
    // _id,
    username,
    password,
    first_name,
    last_name,
    country,
    email,
}

const users = {
    // request data validation
    schema: {
        // response data serialization
        response: {
            '2xx': {
                type: 'array',
                items: {
                    type: 'object',
                    properties: userProps
                }
            }
        }
    }
}

const user = {
    // request data validation
    schema: {
        // response data serialization
        response: {
            '2xx': {
                type: 'object',
                properties: userProps
            }
        }
    }
}

const register = {
    // request data validation
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password', 'first_name', 'last_name', 'country', 'email'],
            properties: {
                username,
                password,
                first_name,
                last_name,
                country,
                email
            }
        },
        // response data serialization
        response: {
            '2xx': {
                type: 'object',
                properties: userProps
            }
        }
    }
}

module.exports = { users, user, register }