const {Router} = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCatById, putCategory, delCategory } = require('../controllers/controlcat');
const { existCategoryById } = require('../helpers/db-validators');
const { valFields, validateJWT, isAdmin } = require('../middlewares');

const router = Router();

router.get('/',  getCategories);

router.get('/:id', [
    check('category', 'Id not valid').isMongoId(),
    check('id').custom(existCategoryById),
    valFields,
] , getCatById);

router.post('/', [ 
    validateJWT,
    check('name', 'Required name').not().isEmpty(),
    valFields
], createCategory);

router.put('/:id', [
   validateJWT,
   check('name', 'Required name').not().isEmpty(),
   check('id').custom(existCategoryById),
   valFields
] ,putCategory);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('category', 'Id not valid').isMongoId(),
    check('id').custom(existCategoryById),
    valFields
] , delCategory);


module.exports = router;