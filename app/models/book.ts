import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Country from '#models/country'
import Language from '#models/language'
import type { HasOne } from '@adonisjs/lucid/types/relations'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
