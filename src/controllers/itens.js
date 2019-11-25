const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class ItensController{

    //async getAllItens (req, res, next){}

    async getAllBolas(req,res,next){
        try{
        const query = knex.select('Itens.valor as valor', 'Bola.marca as marca', 
        'Esportes.descricao as esporte_descricao').from('Itens').join('Bola', 
        {'Itens.cod_item' : 'Bola.cod_item'}).join('Esportes',{'Bola.cod_esporte' : 'Esportes.cod_esporte'})

        query.then( (Times, Esportes) => { res.json( { Times, Esportes}); }); 
        }catch(err){next(NotFound('Element does not exists'))}    
    }

}
module.exports = ItensController