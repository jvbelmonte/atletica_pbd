const { knex, db } = require('../connectors/knex')
const { NotFound, NotImplemented, InternalServerError } = require('../utils/errorHandler')

class ItensController{

    async getAllItens (req, res, next){}

    async getAllBolas(req,res,next){
        try{
            const query = knex.select('Itens.valor as valor', 'Bola.marca as marca', 
            'Esportes.descricao as esporte_descricao').from('Itens').join('Bola', 
            {'Itens.cod_item' : 'Bola.cod_item'}).join('Esportes',{'Bola.cod_esporte' : 'Esportes.cod_esporte'})

            query.then( (Itens) => { res.json( Itens); }); 
        }catch(err){next(NotFound('Element does not exists'))}    
    }

    async getAllCamisas(req, res, next){
        try{
            const query = knex.select('Camisa.tipo', 'Camisa.tamanho','Camisa.numero',
            'Esportes.descricao as esporte_descricao').from('Camisa').join('Esportes',
            {'Camisa.cod_esporte' : 'Esportes.cod_esporte'})

            query.then((Camisa) => {res.json(Camisa);});
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async getAllBandeiras(req, res, next){
        try{
            const query = knex.select('Bandeira.tamanho', 'Itens.valor').from('Bandeira').join('Itens',
            {'Bandeira.cod_item' : 'Itens.cod_item'})

            query.then((Bandeira) => {res.json(Bandeira);});
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async getAllOutros(req, res, next){
        try{
            const query = knex.select('Outros.descricao', 'Itens.valor').from('Outros').join('Itens',
            {'Outros.cod_item' : 'Itens.cod_item'})

            query.then((Outros) => {res.json(Outros);});
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async insertItens(req, res, next){
        const tipo_item = req.body.tipo_item
        try{
            if(tipo_item == 'camisa'){
                const {valor, nome_esporte, tipo, tamanho, numero} = req.body    

                // insert in ITENS
                await knex('Itens').insert({valor : valor, tipo : tipo_item})
                // SELECT LAST cod_item
                const last_item = await knex('Itens').max({ cod_item : 'cod_item' })
                const id_last_item = JSON.stringify(last_item[0].cod_item)

                // return cod_esporte from Esportes to insert in CAMISA.cod_esporte
                const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
                const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
                // ------------------------------------------------------------------

                const query_add = await knex('Camisa').insert({cod_item : id_last_item, tipo : tipo, 
                    tamanho : tamanho, numero : numero, cod_esporte : id_esporte_integer})

                req.app.locals.res.sucess.json(res, 'post', query_add) 

            }else if(tipo_item == 'bola'){
                const {valor, marca} = req.body

                // insert in ITENS
                await knex('Itens').insert({valor : valor, tipo : tipo_item})
                // SELECT LAST cod_item
                const last_item = await knex('Itens').max({ cod_item : 'cod_item' })
                const id_last_item = JSON.stringify(last_item[0].cod_item)

                // return cod_esporte from Esportes to insert in CAMISA.cod_esporte
                const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
                const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
                // ------------------------------------------------------------------

                const query_add = await knex('Bola').insert({cod_item : id_last_item, marca : marca, 
                    cod_esporte : id_esporte_integer})

                req.app.locals.res.sucess.json(res, 'post', query_add) 
            
            }else if(tipo_item == 'bandeira'){
                const {valor, tamanho} = req.body

                // insert in ITENS
                await knex('Itens').insert({valor : valor, tipo : tipo_item})
                // SELECT LAST cod_item
                const last_item = await knex('Itens').max({ cod_item : 'cod_item' })
                const id_last_item = JSON.stringify(last_item[0].cod_item)

                const query_add = await knex('Bandeira').insert({cod_item : id_last_item, tamanho : tamanho})

                req.app.locals.res.sucess.json(res, 'post', query_add) 

            }else if(tipo_item == 'outro'){
                const {valor, descricao} = req.body

                // insert in ITENS
                await knex('Itens').insert({valor : valor, tipo : tipo_item})
                // SELECT LAST cod_item
                const last_item = await knex('Itens').max({ cod_item : 'cod_item' })
                const id_last_item = JSON.stringify(last_item[0].cod_item)

                const query_add = await knex('Outros').insert({cod_item : id_last_item, descricao : descricao})

                req.app.locals.res.sucess.json(res, 'post', query_add) 
            }
        }catch(err){next(NotFound('Element does not exists'))}    
    }

    async deleteItens(req, res, next){
        const cod_item = req.body.cod_item

        const query = await knex('Itens').where('cod_item', cod_item).del()
        if(!query){
            throw NotFound('Element does not exist')
        }
        req.app.locals.res.sucess.json(res,'delete', querys)
    }

    async updateBolas(req, res,next){
        const cod_item = req.body.cod_item
        // select 'tipo' from Itens
        const queryItem = await knex('Itens').select('tipo').where({'cod_item' : cod_item})
        const query_tipo = JSON.stringify(queryItem[0].tipo)

        try{
            if(query_tipo == 'bola'){
                const {nome_esporte, valor, marca} = req.body

                // return cod_esporte from Esportes to insert in CAMISA.cod_esporte
                const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
                const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
                // ------------------------------------------------------------------

                const query = await knex('Bola').where('cod_item', cod_item).update({
                    valor : valor, marca : marca, cod_esporte : id_esporte_integer })
                if(!query){
                    throw NotFound('Element does not exist')
                }
                req.app.locals.res.sucess.json(res, 'put', query)
            }
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async updateCamisas(req, res, next){
        const cod_item = req.body.cod_item
        // select 'tipo' from Itens
        const queryItem = await knex('Itens').select('tipo').where({'cod_item' : cod_item})
        const query_tipo = JSON.stringify(queryItem[0].tipo)

        try{
            if(query_tipo == 'camisa'){
                const {valor, nome_esporte, tipo, tamanho, numero} = req.body  
                
                // return cod_esporte from Esportes to insert in CAMISA.cod_esporte
                const id_esporte = await knex('Esportes').select('cod_esporte').where({'descricao' : nome_esporte});
                const id_esporte_integer = JSON.stringify(id_esporte[0].cod_esporte)
                // ------------------------------------------------------------------
                
                const query = await knex('Camisa').where('cod_item', cod_item).update({
                    valor : valor, cod_esporte : id_esporte_integer, tipo : tipo, tamanho : tamanho, numero : numero})
                if(!query){
                    throw NotFound('Element does not exist')
                }
                req.app.locals.res.sucess.json(res, 'put', query)
            }
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async updateOutros(req, res, next){
        const cod_item = req.body.cod_item
        // select 'tipo' from Itens
        const queryItem = await knex('Itens').select('tipo').where({'cod_item' : cod_item})
        const query_tipo = JSON.stringify(queryItem[0].tipo)

        try{
            if(query_tipo == 'outro'){
                const {valor, descricao} = req.body
                const query = await knex('Outros').where('cod_item', cod_item).update({
                    valor : valor, descricao : descricao })
                if(!query){
                    throw NotFound('Element does not exist')
                }
                req.app.locals.res.sucess.json(res, 'put', query)
            }
        }catch(err){next(NotFound('Element does not exists'))}
    }

    async updateBandeiras(req, res, next){
        const cod_item = req.body.cod_item
        // select 'tipo' from Itens
        const queryItem = await knex('Itens').select('tipo').where({'cod_item' : cod_item})
        const query_tipo = JSON.stringify(queryItem[0].tipo)

        try{
            if(query_tipo == 'bandeira'){
                const {valor, tamanho} = req.body
                const query = await knex('Bandeiras').where('cod_item', cod_item).update({
                    valor : valor, tamanho : tamanho })
                if(!query){
                    throw NotFound('Element does not exist')
                }
                req.app.locals.res.sucess.json(res, 'put', query)
            }
        }catch(err){next(NotFound('Element does not exists'))}
    }


}
module.exports = ItensController