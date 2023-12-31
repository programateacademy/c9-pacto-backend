const express = require('express')

const controllerUser = require('../controllers/user')

const router = express.Router()
const authJwt = require('../middlewares/authJwt')
const verifySignup = require('../middlewares/verifySignup')

// registro de usuarios que solo puede realizar admin
//router.post('/create', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoleExist, verifySignup.checkDupletUserNameOrEmail
//], controllerUser.create) 

router.put('/update/:id', controllerUser.updatedUser)
router.get('/', controllerUser.getUser)
router.get('/:id', controllerUser.getUserById)
router.delete('/delete/:id', controllerUser.deleteUser) // eliminar usuarios que solo puede realizar admin

module.exports = router
