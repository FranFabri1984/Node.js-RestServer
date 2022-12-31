const {Router} = require('express');
const { check } = require('express-validator');
const { valFields } = require('../middlewares/validate-fields');
const { getUser, postUser, putUser, delUser, patchUser } = require('../controllers/controluser');
const { isValid, existEmail, existUserId } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUser);

router.post('/',[
    check('name', 'Required name').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('pass', 'The pass requires 6 digits').isLength({min: 6}),
    //check('rol', 'Role not valid').isIn(['ADMIN','USER']),
    check('email').custom(existEmail),
    check('rol').custom(isValid),
    valFields
], postUser );

router.put('/:id',[
    check('id', 'Id not valid').isMongoId(),
    check('id').custom(existUserId),
    check('rol').custom(isValid),
    valFields
], putUser);

router.delete('/:id',[
    check('id', 'Id not valid').isMongoId(),
    check('id').custom(existUserId),
    valFields
], delUser);

router.patch('/', patchUser);

module.exports = router;


