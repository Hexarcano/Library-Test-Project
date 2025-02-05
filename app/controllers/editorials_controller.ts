import Country from '#models/country'
import Editorial from '#models/editorial'
import { createEditorialValidator } from '#validators/editorial'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class EditorialsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const editorials = await Editorial.all()

    return editorials
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEditorialValidator)

    const trx = await db.transaction()
    try {
      const editorial = new Editorial()
      editorial.name = request.input('name')
      editorial.bussiness_name = request.input('bussiness_name')
      editorial.address = request.input('address')
      editorial.postal_code = request.input('postal_code')

      //Registrar relación pais/editorial editorial
      const country = await Country.findOrFail(request.input('country_id'))
      country.related('editorial').save(editorial)

      editorial.save()
      trx.commit()
      response.status(200).send('New editorial created.')
    } catch (error) {
      console.log(error)
      trx.rollback()
      response.status(500).send('Invalid Request.')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const editorial = await Editorial.findOrFail(params.id)

    return editorial
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const editorial = await Editorial.findOrFail(params.id)
    editorial.name = request.input('name')
    editorial.bussiness_name = request.input('bussiness_name')
    editorial.address = request.input('address')
    editorial.postal_code = request.input('postal_code')

    const country = await Country.findOrFail(request.input('country_id'))
    country.related('editorial').save(editorial)

    await editorial.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const editorial = await Editorial.findOrFail(params.id)

    await editorial.delete()
  }
}
