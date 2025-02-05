/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthorsController from '#controllers/authors_controller'
import CountriesController from '#controllers/countries_controller'
import GenresController from '#controllers/genres_controller'
import LanguagesController from '#controllers/languages_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.resource('languages', LanguagesController).apiOnly(),
    router.resource('authors', AuthorsController).apiOnly(),
    router.resource('genres', GenresController).apiOnly(),
    router.resource('countries', CountriesController).apiOnly()
  })
  .prefix('/api/v1')
