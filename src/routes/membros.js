const express = require('express')
const router = express.Router()
const MembrosController = require('../controllers/membros')

const crtl = new MembrosController()

router.get('/', crtl.getAllMembros);
router.get('/:id', crtl.getById);
router.post('/', crtl.addMembro);
router.put('/:id', crtl.updateMembro);


module.exports = router