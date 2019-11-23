const Knex = require('knex');
const { development } = require('../../database/knexfile')

const knex = Knex(development)

const db = {
    simpleGetAll: (table, columns = '*') =>
      knex(table).select(columns),
  
    getBySpecificId: async (table, column, value, columns = '*') =>
      knex(table).select(columns).where(column, value),
  
    getByFilter: (table, where = {}) =>
      knex(table).select().where(where),
  
    insert: async (table, data) =>
      knex(table).insert(data),
  
    update: async (table, data, column, value) => {
      const response = await knex(table).update(data).where(column, value)
  
      if (response === 0) { throw NotFound('Element does not exists') } else return response
    },
  
    delete: async (table, column, value) => {
      const response = await knex(table).delete().where(column, value)
      if (response === 0) { throw NotFound('Element does not exists') } else return response
    }
}

module.exports = {knex, db}