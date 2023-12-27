import type { Knex } from 'knex'

// Update with your config settings.

const config: Record<string, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'cars_management_server',
      user: 'muhammadbachtiar',
      password: '123456',
      port: 5000
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

}

module.exports = config
