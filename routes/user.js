const {Router} = require('express');
const { getUser, postUser, putUser, delUser, patchUser } = require('../controllers/controluser');

const router = Router();

router.get('/', getUser);

router.post('/', postUser );

router.put('/:id', putUser);

router.delete('/', delUser);

router.patch('/', patchUser);

module.exports = router;


