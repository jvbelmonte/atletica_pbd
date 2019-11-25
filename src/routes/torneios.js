const express = require('express')
const router = express.Router()
const TorneiosController = require('../controllers/torneios')

const crtl = new TorneiosController()

router.get('/', crtl.getAllTorneios);
router.post('/', crtl.insertTorneios);
router.delete('/:id', crtl.deleteTorneios);
router.put('/:id', crtl.updateTorneios);

module.exports = router