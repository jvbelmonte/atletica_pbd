const express = require('express')
const router = express.Router()
const TreinosController = require('../controllers/treinos')

const crtl = new TreinosController()

router.get('/', crtl.getAllTreinos);
router.post('/', crtl.insertTreinos);
router.delete('/:id', crtl.deleteTreinos);
router.put('/:id', crtl.updateTreinos);

module.exports = router