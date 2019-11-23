exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Membros').del()
        .then(function () {
            // Inserts seed entries
            return knex('Membros').insert([
                {
                    matricula: 2515,
                    cpf: 123123123,
                    rg: 12312312,
                    nome: 'Carlos',
                    cargo: 'Diretor',
                    telefone: '131313-1313',
                    endereco: 'Rua',
                    curso: 'CC',
                    status_matricula: 'matriculado'
                },
                {
                    matricula: 2512135,
                    cpf: 4444123,
                    rg: 661,
                    nome: 'João',
                    cargo: 'Plebeu',
                    curso: 'CC',
                    telefone: '41313-1313',
                    endereco: 'Avenida',
                    status_matricula: 'matriculado'
                },
            ]);
        });
};
