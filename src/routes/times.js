const express = require('express')
const router = express.Router()
const TimesController = require('../controllers/times')

const crtl = new TimesController()

router.get('/', crtl.getAllTimes);
router.post('/', crtl.insertTimes);
router.delete('/:id', crtl.deleteTimes);
router.put('/:id', crtl.updateTimes);

module.exports = router