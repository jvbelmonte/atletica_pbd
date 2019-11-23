const express = require('express')
const router = express.Router()
const membros = require('./membros')
const morgan = require('morgan')

router.use(morgan('dev'))

router.use('/membros', membros)

module.exports = router