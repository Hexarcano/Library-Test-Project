import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'editorial_books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
      table.integer('editorial_id').unsigned().references('editorials.id').onDelete('CASCADE')
      table.unique(['book_id', 'editorial_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
