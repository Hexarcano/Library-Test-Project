import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('isbn', 13)
      table.text('name')
      table.smallint('edition')
      table.date('publication_date')
      table.integer('country_id').unsigned().references('countries.id').onDelete('CASCADE')
      table.integer('language_id').unsigned().references('languages.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
