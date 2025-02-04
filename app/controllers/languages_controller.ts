import Language from '#models/language'
import { createLanguageValidator } from '#validators/language'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class LanguagesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const language = await Language.all()

    return language
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createLanguageValidator)

    const trx = await db.transaction()

    try {
      const language = new Language()
      language.name = request.input('name')

      await language.save()
      trx.commit()
      response.status(200).send('New language created.')
    } catch (error) {
      trx.rollback()
      response.status(400).send('Invalid request.')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const language = await Language.findOrFail(params.id)

    return language
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const language = await Language.findOrFail(params.id)
    console.log(language)
    language.name = request.input('name')

    await language.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const language = await Language.findOrFail(params.id)

    await language.delete()
  }
}
