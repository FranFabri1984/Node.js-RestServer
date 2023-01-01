const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/controlauth');
const { valFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'Email required').isEmail(),
    check('pass', 'Pass required').not().isEmpty(),
    valFields
],login);

module.exports = router;