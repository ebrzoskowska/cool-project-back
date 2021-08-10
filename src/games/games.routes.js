const {Router} = require('express');
const {createGame, createComment, findGames, findGame, deleteGame} = require('./games.controllers')
const gamesRouter = Router();

gamesRouter.post('/games', createGame)
gamesRouter.put('/games', createComment)
gamesRouter.get('/games/:gameid', findGame)
gamesRouter.get('/games', findGames)
gamesRouter.delete('/games', deleteGame)

module.exports = gamesRouter;