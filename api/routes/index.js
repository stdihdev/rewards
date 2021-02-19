const express = require('express');
const passport = require('passport');

const discounts = require('../controllers/discounts');
const auth = require('../controllers/auth');
const router = express.Router();

/* routes. */
router.get('/getByCode', discounts.getByCode);
router.put('/updateByCode', discounts.updateByCode);
router.post('/token', auth.token)

module.exports = router;
