var sha256 = require('crypto-js/sha256');

var Game = require('../models/game');
var User = require('../models/user');
var responses = require('../models/gamesResponse');

var idToGameMap = new Map();
var invCodeToIdMap = new Map();

var id = 0;
var userId = 0;

/** 
 * Middleware to handle POST request to create game.
 * @module gameCreatePost
 * @function
 * @param {Request} req
 * @param {string} req.query.username
 * @param {Response} res
 * @returns {void}
 */
module.exports.game_create_post = function(req, res) {
    // TODO: Use existing userId from cookie, if any.
    // Also consider null / empty usernames.
    var inviteCode = sha256(id).toString().substring(0, 6);

    if (invCodeToIdMap.has(inviteCode)) {
        inviteCode = modify_invite_code(inviteCode);
    }

    var game = new Game(id, inviteCode);
    game.users.push(new User(userId, req.query.username));
    idToGameMap.set(id, game); 
    invCodeToIdMap.set(inviteCode, id);

    res.send(new responses.CreateGameResponse(id, inviteCode, userId));
    id++;
    userId++;
}

/**
 * Modify invite code to avoid collisions with existing ones.
 * @param {string} inviteCode
 */
var modify_invite_code = function(inviteCode) {
    // TODO
    return inviteCode;
}

/** 
 * Middleware to handle POST request to join game.
 * @module gameJoinPost 
 * @function 
 * @param {Request} req
 * @param {string} req.query.username
 * @param {string} req.query.inviteCode
 * @param {Response} res
 * @returns {void}
 */
module.exports.game_join_post = function(req, res) {
    // TODO: don't add dupe users.
    var gameId = invCodeToIdMap.get(req.query.inviteCode);
    
    if (gameId === null) {
        // throw some kind of error here.
    }

    var game = idToGameMap.get(gameId);
    game.users.push(new User(userId, req.query.username));

    res.send(new responses.JoinGameResponse(game.id, game.inviteCode, game.users, userId));
    userId++;
}

/** 
 * Middleware to handle GET request for game.
 * @module gameGet
 * @function
 * @param {Request} req
 * @param {string} req.params.id
 * @param {Response} res
 * @returns {void}
 */
module.exports.game_get = function(req, res) {
    var game = idToGameMap.get(parseInt(req.params.id));

    // TODO: throw some kind of error if game doesn't exist
    if (game === null) {
        
    }

    res.send(new responses.GetGameResponse(game.id, game.inviteCode, game.users));
}