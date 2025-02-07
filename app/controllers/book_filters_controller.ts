import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookFiltersController {
  async byGenres({ request }: HttpContext) {
    const queryString = request.qs()
    const genres: number[] = Array.isArray(queryString.genres)
      ? queryString.genres
      : [Number(queryString.genres)]

    const books = await Book.query()
      .whereHas('genres', (query) => {
        query.whereIn('genres.id', genres) // Asegurarse de que los IDs sean números
      })
      .preload('country')
      .preload('language')
      .preload('authors')
      .preload('genres')
      .preload('editorials')

    return books
  }
}
