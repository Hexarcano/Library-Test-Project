import Author from '#models/author'
import Book from '#models/book'
import Country from '#models/country'
import Editorial from '#models/editorial'
import Genre from '#models/genre'
import Language from '#models/language'
import { createBookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const books = await Book.query()
      .preload('country')
      .preload('language')
      .preload('authors')
      .preload('genres')
      .preload('editorials')

    return books
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createBookValidator)

    const trx = await db.transaction()

    try {
      const book = new Book()

      book.isbn = request.input('isbn')
      book.name = request.input('name')
      book.edition = request.input('edition')
      book.publication_date = request.input('publication_date')

      const country = await Country.findOrFail(request.input('country_id'))
      await country.related('book').save(book)

      const language = await Language.findOrFail(request.input('language_id'))
      await language.related('book').save(book)

      book.save()

      const authors: number[] = request.input('authors')
      authors.forEach(async (id) => {
        const author = await Author.findOrFail(id)

        await author.related('books').save(book)
      })

      const genres: number[] = request.input('genres')
      genres.forEach(async (id) => {
        const genre = await Genre.findOrFail(id)

        await genre.related('books').save(book)
      })

      const editorials: number[] = request.input('editorials')
      editorials.forEach(async (id) => {
        const editorial = await Editorial.findOrFail(id)

        await editorial.related('books').save(book)
      })

      book.save()
      trx.commit()
      response.status(200).send('New book created.')
    } catch (error) {
      trx.rollback()
      response.status(500).send('Invalid request.')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('country')
      .preload('language')
      .preload('authors')
      .preload('genres')
      .preload('editorials')
      .firstOrFail()

    return book
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    book.isbn = request.input('isbn')
    book.name = request.input('name')
    book.edition = request.input('edition')
    book.publication_date = request.input('publication_date')

    const country = await Country.findOrFail(request.input('country_id'))
    await country.related('book').save(book)

    const language = await Language.findOrFail(request.input('language_id'))
    await language.related('book').save(book)

    const authors: number[] = request.input('authors')
    authors.forEach(async (id) => {
      const author = await Author.findOrFail(id)

      await author.related('books').save(book)
    })

    const genres: number[] = request.input('genres')
    genres.forEach(async (id) => {
      const genre = await Genre.findOrFail(id)

      await genre.related('books').save(book)
    })

    const editorials: number[] = request.input('editorials')
    editorials.forEach(async (id) => {
      const editorial = await Editorial.findOrFail(id)

      await editorial.related('books').save(book)
    })

    book.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    await book.delete()
  }
}
