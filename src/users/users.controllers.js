const User = require('./users.model')

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        const savedUser = await user.save();
        const token = await user.generateAuthToken(user._id)
        res.status(200).send({
            user: savedUser,
            token: token,
            message: 'User created in database'
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.authUser = async (req, res) =>{
    res.status(200).send(req.user)
}

exports.findUser = async (req, res) => {
    try {
        const user = req.params.username
        const targetUser = await User.findOne({
            username: user,
            password: req.body.password
        })
        const token = await targetUser.generateAuthToken(targetUser._id)
        res.status(200).send({
            user: targetUser,
            token: token
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userInput = {
            user: req.body.username,
            pass: req.body.password,
            newpass: req.body.newpass,
            email: req.body.email,
            age: req.body.age,
            payment: req.body.payment
        }
        await User.findOneAndUpdate({
            username: userInput.user,
            password: userInput.pass,
        }, {
            password: userInput.newpass,
            email: userInput.email,
            age: userInput.age,
            paymentInfo: userInput.payment
        }, (err, oldUser) => {
            if (err) res.status(500).send(err);
            res.status(200).send({
                oldUser,
                message: 'User updated successfully'
            })
        })

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userInput = {
            user: req.body.user,
            pass: req.body.pass,
            confirmation: req.body.confirmation
        }
        if (userInput.confirmation === 'I am sure') {
            await User.findOneAndRemove({
                username: userInput.user,
                password: userInput.pass
            }, (err, user)=>{
                if(err) res.status(500).send(err);
                res.status(200).send({
                    user,
                    message: 'User has been deleted'
                })
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}