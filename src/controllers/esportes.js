const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class EsportesController{

    async getAllEsportes (req, res, next){
        try{
            const query = knex.select('descricao').from('Esportes')
            query.then((Esportes) => {res.json(Esportes)})
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async insertEsportes(req,res,next){
        const descricao = req.body.descricao

        const query = await knex('Esportes').insert({descricao : descricao})
        if(!query){
            throw NotFound('Element does not exists')
        }
        req.app.locals.res.sucess.json(res, 'post', query)
    }

    /*async deleteEsportes(req, res, next){
        const cod_esporte = req.body.cod_esporte

        const query = await knex('Esportes').where('cod_esporte' , cod_esporte).del()
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res, 'delete', query)
    }*/

    async updateEsportes(req, res, next){
        const cod_esporte = req.body.cod_esporte
        const descricao = req.body.descricao

        const query = await knex('Esportes').where('cod_esporte', cod_esporte).update({descricao : descricao})
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res, 'put', query)
    }


}

module.exports = EsportesController