import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Country from '#models/country'
import Language from '#models/language'
import Author from '#models/author'
import Genre from '#models/genre'
import Editorial from '#models/editorial'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

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

  @column()
  declare countryId: number

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @column()
  declare languageId: number

  @belongsTo(() => Language)
  declare language: BelongsTo<typeof Language>

  @manyToMany(() => Author, {
    pivotTable: 'book_authors',
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'author_id',
    pivotTimestamps: true,
  })
  declare authors: ManyToMany<typeof Author>

  @manyToMany(() => Genre, {
    pivotTable: 'genre_books',
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'genre_id',
    pivotTimestamps: true,
  })
  declare genres: ManyToMany<typeof Genre>

  @manyToMany(() => Editorial, {
    pivotTable: 'editorial_books',
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'editorial_id',
    pivotTimestamps: true,
  })
  declare editorials: ManyToMany<typeof Editorial>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
