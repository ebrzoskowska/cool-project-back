const {Router} = require('express')
const {auth} = require('../middleware')
const { createUser, authUser, findUser, updateUser, deleteUser} = require('./users.controllers')
const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', auth, authUser);
userRouter.post('/users/:username', findUser);
userRouter.put('/users', updateUser)
userRouter.delete('/users', deleteUser)

module.exports = userRouter;