const Game = require('./games.model')

exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body)
        const savedGame = await game.save();
        res.status(200).send({
            game: savedGame,
            message: 'Game successfully added to database.'
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.createComment = async (req, res) => {
    try {
        const comment = {
            user: req.body.user,
            content: req.body.content,
            rating: req.body.rating,
            date: req.body.date
        };
        await Game.findOneAndUpdate({
            _id: req.body.gameid
        }, {
            $push: {
                comments: comment
            }
        }, {
            new: true
        }, (err, result) => {
            if (err) res.status(500).send(err);
            res.status(200).send({
                game: result,
                message: 'Comment submitted'
            })
        });
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.findGame = async (req, res) =>{
    try {
        const targetGame = await Game.find({
            _id: req.params.gameid
        })
        res.status(200).send({
            targetGame
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.findGames = async (req, res) => {
    try {
        const targetGames = await Game.find()
        res.status(200).send({
            targetGames
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteGame = async (req, res) =>{
    try {
        const input = {
            _id: req.body.gameid,
        }  
        await Game.findOneAndDelete(input, (err, game) =>{
            if(err) res.status(500).send(err);
            res.status(200).send({message: `You have removed ${req.body.gameid} successfully.`})
        })
    } catch (err) {
        res.status(500).send(err)
    }
}