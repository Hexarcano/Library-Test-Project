import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Book from '#models/book'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column.date()
  declare birthDate: DateTime

  @manyToMany(() => Book, {
    pivotTable: 'book_authors',
    localKey: 'id',
    pivotForeignKey: 'author_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTimestamps: true,
  })
  declare books: ManyToMany<typeof Book>

  @column.date()
  declare deathDate: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
