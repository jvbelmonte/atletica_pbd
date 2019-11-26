const express = require('express')
const router = express.Router()
const ItensController = require('../controllers/itens')

const crtl = new ItensController()

//router.get('/', crtl.getAllItens);
router.get('/bolas',crtl.getAllBolas);
router.get('/camisas', crtl.getAllCamisas);
router.get('/bandeiras',crtl.getAllBandeiras);
router.get('/outros', crtl.getAllOutros);
router.post('/', crtl.insertItens);
router.delete('/:id', crtl.deleteItens);
router.put('/bola/:id', crtl.updateBolas);
router.put('/camisa/:id', crtl.updateCamisas);
router.put('/outro/:id', crtl.updateOutros);
router.put('/bandeira/:id', crtl.updateBandeiras);



module.exports = router