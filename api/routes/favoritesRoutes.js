const express = require('express');
const router = express.Router();


const favoriteControllers = require('../controllers/favoriteControllers');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, favoriteControllers.getFavoritesByEmail);
router.post('/', verifyToken, favoriteControllers.addToFavorites);
router.delete('/:favoriteId/menu/:menuId', verifyToken, favoriteControllers.deleteFavorite);

module.exports = router;
