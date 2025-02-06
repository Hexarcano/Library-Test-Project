import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Book from '#models/book'

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Book, {
    pivotTable: 'genre_books',
    localKey: 'id',
    pivotForeignKey: 'genre_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTimestamps: true,
  })
  declare books: ManyToMany<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
