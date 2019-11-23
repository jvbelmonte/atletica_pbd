const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class MembrosController{

	async addMembro (req, res, next) {
		const { matricula, cpf, rg, nome, curso, cargo, telefone, endereco, status_matricula } = req.body;
        const query = await knex('Membros').insert({
            matricula : matricula, 
            cpf : cpf,
            rg : rg, 
            nome : nome, 
            curso : curso, 
            cargo : cargo, 
            telefone : telefone, 
            endereco : endereco, 
            status_matricula : status_matricula
        })
        
        if(!query){
           res.send(err);
        }
        req.app.locals.res.sucess.json(res, 'post', query) 
       
    }

	async getAllMembros (req, res, next){
        try{
            const query = knex.select().table('Membros');

            query.then( (Membros) => { res.json(Membros); }); 
        }catch(err){next(NotFound('Element does not exists'))}    
    }
    
    async getById(req, res, next){
        const cod_membro = req.body.cod_membro;
        try{
            const query = knex('Membros').where('cod_membro', cod_membro);

            query.then( (Membros) => { res.json(Membros); }); 
        }catch(err){next (NotFound('Element does not exists'))}     
    }    

    async updateMembro (req, res, next){
        const matricula = req.body.matricula;
        const { cpf, rg, nome, curso, cargo, telefone, endereco, status_matricula } = req.body;
        
        const query = await knex('Membros').where('matricula', matricula).update({
            cpf : cpf,
            rg : rg, 
            nome : nome, 
            curso : curso, 
            cargo : cargo, 
            telefone : telefone, 
            endereco : endereco, 
            status_matricula : status_matricula
        })
            if(!query){
                throw NotFound('Element does not exists')
            }
            req.app.locals.res.sucess.json(res, 'put', query) 

    }
}

module.exports = MembrosController