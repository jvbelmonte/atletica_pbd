require('dotenv').config({path: './.env'});
const development = {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_SCHEMA,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    },
    migrations:{
      directory: './database/migrations'
    },
    seeds:{
      directory: './database/seeds'
    }
  }

  const staging = {
    client: 'mysql',
    connection: {
      database: 'Atletica',
      user: 'joao',
      password: '123'
    }
  }

  const production = {
    client: 'mysql',
    connection: {
      database: 'Atletica',
      user: 'joao',
      password: '123'
    }
  }

  module.exports = {
    development,
    staging,
    production
  }
