const express = require('express')
const router = express.Router()
const esportes = require('./esportes')
const itens = require('./itens')
const membros = require('./membros')
const times = require('./times')
const torneios = require('./torneios')
const treinos = require('./treinos')

const morgan = require('morgan')

router.use(morgan('dev'))

router.use('/esportes', esportes)
router.use('/itens', itens)
router.use('/membros', membros)
router.use('/times', times)
router.use('/torneios', torneios)
router.use('/treinos', treinos)

module.exports = router