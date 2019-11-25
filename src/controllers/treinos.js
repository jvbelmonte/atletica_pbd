const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class TreinosController{

    async getAllTreinos (req, res, next){
        try{
            const query = knex.select('Esportes.descricao as esporte_descricao', 'data_treino', 'hora',
            'local_treino').from('Treinos').join('Esportes', {'Treinos.cod_esporte' : 'Esportes.cod_esporte'})

            query.then( (Treinos, Esportes) => { res.json( { Treinos, Esportes}); }); 
        }catch(err){next(NotFound('Element does not exists'))}    
    }
    async insertTreinos (req, res, next){
        
        const { nome_esporte, data_treino, hora, local_treino } = req.body

        // return cod_esporte from Esportes to insert in TREINOS.cod_Esportes
        const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
        const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
        // ------------------------------------------------------------------
        
        const query = await knex('Treinos').insert({data_treino : data_treino, hora : hora, local_treino : local_treino
            ,  cod_esporte : id_esporte_integer})
        if(!query){
            throw NotFound('Element does not exists')
        }
        req.app.locals.res.sucess.json(res, 'post', query) 
    }
    async deleteTreinos (req, res, next){
        const cod_treino = req.body.cod_treino
        
        const query = await knex('Treinos').where('cod_treino' , cod_treino).del();
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res,'delete', query)
    }
    async updateTreinos (req, res, next){
        const cod_treino = req.body.cod_treino
        
        const { nome_esporte, data_treino, hora, local_treino } = req.body

        // return cod_esporte from Esportes to insert in TREINOS.cod_Esportes
        const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
        const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
        // ------------------------------------------------------------------

        const query = await knex('Times').where('cod_treino', cod_treino).update({data_treino : data_treino, hora : hora,
             local_treino : local_treino,  cod_esporte : id_esporte_integer})
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res, 'put', query)
    }
}
module.exports = TreinosController