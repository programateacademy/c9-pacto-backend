const express = require('express')
const authJwt = require('../../middlewares/authJwt')
const controllerPublication = require('../../controllers/publicationsControllers/publication')


const router = express.Router()

//rutas 
//crear publicación
router.post('/create', controllerPublication.create)

//buscarpublicaciones
router.get('/', controllerPublication.getPublication)

//publicaiones por ID
router.get('/:id', controllerPublication.getPublicationById)

router.get('/publications/user/:userId', controllerPublication.getPublicationsByUserId);

//actualizar la publicación
router.patch('/update/:id', authJwt.verifyToken, controllerPublication.updatePublication)

//eliminar publicación
router.delete('/delete/:id', controllerPublication.deletePublication)

// Dar like a una publicación
router.post('/:id/like', controllerPublication.likePublication);

// Quitar like a una publicación
router.delete('/:id/unlike', controllerPublication.unlikePublication);


// Nueva ruta para obtener los likes de un usuario específico
router.get('/users/:userId/likes', controllerPublication.getLikesForUser);

module.exports = router

