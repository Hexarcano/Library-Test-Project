import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Country from '#models/country'
import Book from '#models/book'

export default class Editorial extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare bussiness_name: string

  @column()
  declare address: string

  @column()
  declare countryId: number

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @manyToMany(() => Book, {
    pivotTable: 'editorial_books',
    localKey: 'id',
    pivotForeignKey: 'editorial_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTimestamps: true,
  })
  declare books: ManyToMany<typeof Book>

  @column()
  declare postal_code: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
