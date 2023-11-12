import { Knex } from "knex";

const TABLE_NAME = "cars";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("type", 50).notNullable();
    table.integer("rent_per_day").notNullable();
    table.string("image_url", 255).notNullable();
    table.timestamp("time_update").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}