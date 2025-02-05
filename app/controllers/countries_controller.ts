import Country from '#models/country'
import { createCountryValidator } from '#validators/country'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CountriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const countries = await Country.all()

    return countries
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCountryValidator)

    const trx = await db.transaction()

    try {
      const country = new Country()
      country.name = request.input('name')

      country.save()
      trx.commit()
      response.status(200).send('New country created.')
    } catch (error) {
      trx.rollback()
      response.status(500).send('Invalid Request.')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const country = await Country.findOrFail(params.id)

    return country
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    country.name = request.input('name')

    await country.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const country = await Country.findOrFail(params.id)

    await country.delete()
  }
}
