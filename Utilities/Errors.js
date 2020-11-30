generateError = (type, message) => {
    const error = new Error(message)
    error.name = type
    return error
}

module.exports = generateError