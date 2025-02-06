import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_authors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
      table.integer('author_id').unsigned().references('authors.id').onDelete('CASCADE')
      table.unique(['book_id', 'author_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
