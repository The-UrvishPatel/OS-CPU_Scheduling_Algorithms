const express = require('express')
const router = express.Router()
const validateInput = require('../middlewares/validate-input')

const {
    fcfs,
    sjf,
    rr,
    ps,
    srtf,
    lrtf
} = require('../controllers/controllers')

router.route('/fcfs').post(validateInput,fcfs)
router.route('/sjf').post(validateInput,sjf)
router.route('/rr').post(validateInput,rr)
router.route('/ps').post(validateInput,ps)
router.route('/srtf').post(validateInput,srtf)
router.route('/lrtf').post(validateInput,lrtf)

module.exports = router