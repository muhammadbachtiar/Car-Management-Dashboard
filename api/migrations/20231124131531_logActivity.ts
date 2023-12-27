import { type Knex } from 'knex'

const TABLE_NAME = 'logActivity'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary()
    table.string('activitiy', 255).notNullable()
    table.integer('user_id').notNullable()
    table.integer('car_id').notNullable()
    table.string('user_name', 255).notNullable()
    table.string('car_name', 255).notNullable()
    table.timestamp('action_time').defaultTo(knex.fn.now()).notNullable()

    table.foreign('user_id').references('users.id')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME)
}
