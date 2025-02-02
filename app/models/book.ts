import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import Country from '#models/country'
import Language from '#models/language'
import Author from '#models/author'
import Genre from '#models/genre'
import Editorial from '#models/editorial'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare isbn: string

  @column()
  declare name: string

  @column()
  declare edition: number

  @column()
  declare publication_date: Date

  @hasOne(() => Country)
  declare country_id: HasOne<typeof Country>

  @hasOne(() => Language)
  declare language_id: HasOne<typeof Language>

  @manyToMany(() => Author, {
    pivotTable: 'book_authors',
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'author_id',
  })
  declare authors: ManyToMany<typeof Author>

  @manyToMany(() => Genre, {
    pivotTable: 'genre_books',
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'genre_id',
  })
  declare genres: ManyToMany<typeof Genre>

  @manyToMany(() => Editorial, {
    pivotTable: 'editorial_books',
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'editorial_id',
  })
  declare editorials: ManyToMany<typeof Editorial>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
