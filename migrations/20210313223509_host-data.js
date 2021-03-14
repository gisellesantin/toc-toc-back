exports.up = function (knex) {
  return knex.schema.createTable('host_data', (table) => {
    table.uuid('uuid');
    table.text('name');
    table.integer('memory');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('host_data');
};
