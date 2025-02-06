import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Editorial from '#models/editorial'
import Book from '#models/book'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => Editorial)
  declare editorial: HasMany<typeof Editorial>

  @hasMany(() => Book)
  declare book: HasMany<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
