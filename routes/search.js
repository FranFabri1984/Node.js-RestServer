const {Router} = require('express');
const { Search } = require('../controllers/controlsear');

const router = Router();

router.get('/:set/:term', Search);

module.exports = router;


