import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Country from '#models/country'

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

  @column()
  declare postal_code: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
