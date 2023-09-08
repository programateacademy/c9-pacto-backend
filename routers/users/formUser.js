const express = require('express')
const router = express.Router()
const formController = require('../../controllers/users/formUser')
const authJwt = require ('../../middlewares/authJwt')

router.post('/formCreate',[authJwt.verifyToken],formController.create)
router.get('/:id',[authJwt.verifyToken],formController.getforid)
router.patch('updateForm/:id',[authJwt.verifyToken],formController.updateForm)
router.delete('delete/:id',[authJwt.verifyToken, authJwt.isAdmin],formController.delete)


module.exports = router
