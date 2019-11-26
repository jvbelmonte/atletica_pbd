const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class TorneiosController{

    async getAllTorneios (req, res, next){
        try{
            const query = knex.select('Esportes.descricao as esporte_descricao', 'Torneios.descricao', 'local_torneio', 'data_inicio', 'data_fim', 'taxa_inscricao', 'status_taxa').from('Torneios').join('Esportes', {'Torneios.cod_esporte' : 'Esportes.cod_esporte'})

            query.then( (Torneios) => { res.json(Torneios); }); 
        }catch(err){next(NotFound('Element does not exists'))}    
    }
    async insertTorneios (req, res, next){
        
        const {nome_esporte, descricao, local_torneio, data_inicio, data_fim, taxa_inscricao, status_taxa} = req.body

        // return cod_esporte from Esportes to insert in TORNEIOS.cod_Esportes
        const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
        const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
        // ------------------------------------------------------------------
        
        const query = await knex('Torneios').insert({descricao : descricao, local_torneio : local_torneio, data_inicio : data_inicio, data_fim : data_fim, taxa_inscricao : taxa_inscricao, status_taxa : status_taxa,  cod_esporte : id_esporte_integer})
        if(!query){
            throw NotFound('Element does not exists')
        }
        req.app.locals.res.sucess.json(res, 'post', query) 
    }
    async deleteTorneios (req, res, next){
        const cod_torneio = req.body.cod_torneio
        
        const query = await knex('Torneios').where('cod_torneio' , cod_torneio).del();
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res,'delete', query)
    }
    async updateTorneios (req, res, next){
        const cod_torneio = req.body.cod_torneio
        
        const {nome_esporte, descricao, local_torneio, data_inicio, data_fim, taxa_inscricao, status_taxa} = req.body

        // return cod_esporte from Esportes to insert in TORNEIOS.cod_Esportes
        const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
        const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
        // ------------------------------------------------------------------

        const query = await knex('Times').where('cod_torneio', cod_torneio).update({descricao : descricao, local_torneio : local_torneio, data_inicio : data_inicio, data_fim : data_fim, taxa_inscricao : taxa_inscricao, status_taxa : status_taxa, cod_esporte : id_esporte_integer})
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res, 'put', query)
    }
}
module.exports = TorneiosController