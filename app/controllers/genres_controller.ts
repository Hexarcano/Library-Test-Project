import Genre from '#models/genre'
import { createGenreValidator } from '#validators/genre'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class GenresController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const genres = await Genre.all()

    return genres
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createGenreValidator)

    const trx = await db.transaction()

    try {
      const genre = new Genre()
      genre.name = request.input('name')

      genre.save()
      trx.commit()
      response.status(200).send('New genre created.')
    } catch (error) {
      trx.rollback()
      response.status(500).send('Invalid request.')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const genre = await Genre.findOrFail(params.id)

    return genre
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const genre = await Genre.findOrFail(params.id)
    genre.name = request.input('name')

    await genre.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const genre = await Genre.findOrFail(params.id)

    await genre.delete()
  }
}
