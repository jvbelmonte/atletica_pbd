const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class TimesController{

    async getAllTimes (req, res, next){
        try{
            const query = knex.select('Esportes.descricao as esporte_descricao',
            'Times.descricao').from('Times').join('Esportes', {'Times.cod_esporte' : 'Esportes.cod_esporte'})

            query.then( (Times, Esportes) => { res.json( { Times, Esportes}); }); 
        }catch(err){next(NotFound('Element does not exists'))}    
    }
    async insertTimes (req, res, next){
        const nome_esporte = req.body.nome_esporte;
        
        const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
        const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)

        //console.log(id_esporte_integer)

        const descricao = req.body.descricao
        
        const query = await knex('Times').insert({descricao : descricao, cod_esporte : id_esporte_integer})
        if(!query){
            throw NotFound('Element does not exists')
        }
        req.app.locals.res.sucess.json(res, 'post', query) 
    }
    async deleteTimes (req, res, next){
        const cod_time = req.body.cod_time
        
        const query = await knex('Times').where('cod_time' , cod_time).del();
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res,'delete', query)
    }
    async updateTimes (req, res, next){
        const cod_time = req.body.cod_time
        const descricao = req.body

        const query = await knex('Times').where('cod_time', cod_time).update({descricao : descricao})
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res, 'put', query)
    }
}
module.exports = TimesController