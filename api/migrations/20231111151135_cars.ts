import { type Knex } from 'knex'

const TABLE_NAME = 'cars'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('plate', 20)
    table.string('manufacture', 255)
    table.string('model', 255)
    table.string('image_url', 255).notNullable()
    table.integer('rent_per_day').notNullable()
    table.integer('capacity').notNullable()
    table.string('description', 255).notNullable()
    table.string('transmission', 50).notNullable()
    table.string('type', 50).notNullable()
    table.string('year', 10).notNullable()
    table.json('options')
    table.json('specs')
    table.timestamp('available_at').notNullable()
    table.boolean('isWithDriver').notNullable().defaultTo(false)
    table.timestamp('time_updated').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME)
}
