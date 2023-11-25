import { Knex } from "knex";

const TABLE_NAME = "users";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.string("username", 255).notNullable().unique();
        table.string("email", 255).notNullable().unique();
        table.string("password", 255).notNullable();
        table.string("role", 50).notNullable();
        table.boolean("is_active").defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
  }

