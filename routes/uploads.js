const {Router} = require('express');
const { check } = require('express-validator');
const { loadFile, putImg, showImg } = require('../controllers/controluploads');
const { setAllowed } = require('../helpers/db-validators');
const { valFields, validateFile } = require('../middlewares');

const router = Router();

router.post('/', validateFile, loadFile);

router.put('/:set/:id', [
    validateFile,
    check('id', 'Id not valid').isMongoId(),
    check('set').custom( s => setAllowed(s, ['users', 'products'])),
    valFields
], putImg);

router.get('/:set/:id', [
    check('id', 'Id not valid').isMongoId(),
    check('set').custom( s => setAllowed(s, ['users', 'products'])),
    valFields
], showImg );


module.exports = router;