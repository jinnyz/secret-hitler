var express = require('express');
var router = express.Router();
var controller = require('../controllers/gamesController');

// router.use(function (req, res, next) {
//     console.log('%s %s %s', req.method, req.url, req.path);
//     next();
//   })

// POST games/ - create game
router.post('/', controller.game_create_post); 

// POST games/join - join game 
router.post('/join', controller.game_join_post);

// GET games/:id - lookup game 
router.get('/:id', controller.game_get);

module.exports = router;