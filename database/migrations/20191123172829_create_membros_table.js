
exports.up = function(knex) {
    return knex.schema.createTable('Membros', function(t){
        t.increments('cod_membro').primary();
        t.integer('matricula').notNullable();
        t.integer('cpf').notNullable();
        t.integer('rg').notNullable();
        t.string('nome',45);
        t.string('curso',45);
        t.string('cargo',45);
        t.string('telefone',20);
        t.string('endereco',60);
        t.enum('status_matricula',['matriculado','egresso','trancado'])
            .defaultTo(null);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Membros');
};
