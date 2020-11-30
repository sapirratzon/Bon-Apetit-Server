const errorHelper = require('../Utilities/Errors')
const argon2 = require('argon2')
const mongoose = require('mongoose')

class Handler {
    constructor(fastify) {
        this.User = require('./Model')(fastify)
        this.getFromToken = fastify.getFromToken
    }

    getAll = async () => {
        return this.User.find ({});
    }

    getUserRecipes = async (req, res) => {
        try {
            const user = await this.User.findById(req.params.id).populate({
                path: 'Recipes',
                populate: { path: 'foods' } // !!!!!!!!!!!!!!!!!!!!!!!!!!
            })
            console.log(user.recipes);
            return user.recipes
        } catch (err) {
            res.code(404).send(errorHelper('InvalidArgumentError', err.message))
        }
    }

    addRecipe = async (req, res) => {
        try {
            const user = await this.User.findById(req.params.id)
            user.recipes.push(mongoose.Types.ObjectId(req.body.recipeId))
            await user.save()
            res.code(201).send('Recipe saved successfully')
        } catch (err) {
            res.code(404).send(errorHelper('InvalidArgumentError', err.message))
        }
    }

    get = async (req, res) => {
        try {
            const user = await this.User.findById(req.params.id)
            return user.toJSON()
        } catch (err) {
            res.code(404).send(errorHelper('InvalidArgumentError', err.message))
        }
    }

    register = async (req, res) => {
        // salt is generated automatically
        try {
            const passwordHash = await argon2.hash(req.body.password)
            return this.User.create({
                username: req.body.username,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: passwordHash,
                country: req.body.country
            })
        } catch (err) {
            res.code(400).send(errorHelper('InvalidParameterError', err.message))
        }

    }
}

module.exports = Handler