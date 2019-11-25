const express = require('express')
const router = express.Router()
const EsportesController = require('../controllers/esportes')

const crtl = new EsportesController()

router.get('/', crtl.getAllEsportes);
router.post('/', crtl.insertEsportes);
//router.delete('/:id', crtl.deleteEsportes);
router.put('/:id', crtl.updateEsportes);

module.exports = router