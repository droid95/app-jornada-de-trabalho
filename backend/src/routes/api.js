const express = require('express')
const router = express.Router()

const scheduleController = require('../controllers/scheduleController')
const scheduleValidator = require('../validators/schedule')

router.get('/schedule/:id', scheduleController.get)
router.put('/schedule/:id',
  scheduleValidator.edit,
  scheduleController.edit
)

module.exports = router