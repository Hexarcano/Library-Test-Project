import Author from '#models/author'
import { createAuthorValidator } from '#validators/author'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AuthorsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const authors = await Author.all()

    return authors
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createAuthorValidator)

    const trx = await db.transaction()

    try {
      const author = new Author()

      author.firstName = request.input('firstName')
      author.lastName = request.input('lastName')
      author.birthDate = request.input('birthDate')
      author.deathDate = request.input('deathDate')

      await author.save()
      trx.commit()
      response.status(200).send('New author created.')
    } catch (error) {
      trx.rollback()
      console.log(error)
      response.status(500).send('Invalid request.')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    
    return author
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const author = await Author.findOrFail(params.id)

    author.firstName = request.input('firstName')
    author.lastName = request.input('lastName')
    author.birthDate = request.input('birthDate')
    author.deathDate = request.input('deathDate')

    await author.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)

    await author.delete()
  }
}
