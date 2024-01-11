const express = require('express')
const router = express.Router()

const valdateInput = require('../middlewares/valdate-input')

const {
    fcfs,
    sjf,
    rr,
    ps,
    srtf,
    lrtf
} = require('../controllers/controller')

router.route('/fcfs').get(valdateInput,fcfs)
router.route('/sjf').get(valdateInput,sjf)
router.route('/rr').get(valdateInput,rr)
router.route('/ps').get(valdateInput,ps)
router.route('/srtf').get(valdateInput,srtf)
router.route('/lrtf').get(valdateInput,lrtf)

module.exports = router