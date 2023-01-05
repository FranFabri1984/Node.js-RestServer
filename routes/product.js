const {Router} = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProductById, putProduct, delProduct } = require('../controllers/controlpro');
const { existCategoryById, existProductById } = require('../helpers/db-validators');
const { valFields, validateJWT, isAdmin } = require('../middlewares');

const router = Router();

router.get('/',  getProducts);

router.get('/:id', [
    check('category', 'Id not valid').isMongoId(),
    check('id').custom(existProductById),
    valFields,
] , getProductById);

router.post('/', [ 
    validateJWT,
    check('name', 'Required name').not().isEmpty(),
    check('category', 'Id not valid').isMongoId(),
    check('id').custom(existCategoryById),
    valFields 
], createProduct);

router.put('/:id', [
   validateJWT,
   check('category', 'Id not valid').isMongoId(),
   check('id').custom(existProductById),
   valFields
] ,putProduct);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('category', 'Id not valid').isMongoId(),
    check('id').custom(existProductById),
    valFields
] , delProduct);


module.exports = router;