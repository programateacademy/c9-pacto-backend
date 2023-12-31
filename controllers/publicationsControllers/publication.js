const User = require('../../models/user');
const mongoose = require('mongoose')
const Publication = require('../../models/publications/publication')
const ObjectId = mongoose.Types.ObjectId;



const controllerPublication = {

    //Crear publicacion
    create: async (req, res) => {
        try {
            const { userId, description, image, descriptionImg,likes} = req.body
            const date_create = new Date();

            const user = await User.findById(userId) // buscar el ID del usuario
            if (!user) {
                return res.status(404).json({ error: "could not find user" })
            }

            const newPublication = await Publication.create({
                user: user._id,
                date_create: date_create,
                description: description,
                image: image,
                descriptionImg, 
                likes: []
            });
            newPublication.likes = likes.map((userId) => mongoose.Types.ObjectId(userId)); //Mapeo de _id para evitarlo en la base de datos
            await newPublication.save()
            res.json({ msg: 'publication created', publication: newPublication });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //buscar publicaciones
    getPublication: async (req, res) => {
        try {
            const publications = await Publication.find({})
            res.json(publications.reverse()) //devuelve la ultima publicacion y la unica primero
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //buscar publicacioens por Id
    getPublicationById: async (req, res) => {
        try {
            const { id } = req.params
            const publication = await Publication.findById(id) //filtrado por id 
            res.json(publication)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getPublicationsByUserId: async (req, res) => {
        const userId = req.params.userId; // Obtén el ID de usuario de los parámetros de la solicitud
        try {
            const publications = await Publication.find({ user: userId }).sort({ timestamp: -1 }); // Filtra por ID de usuario y ordena por timestamp descendente
            res.json(publications);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    
    //actualizacion de publicaciones
    updatePublication: async (req, res) => {
        try {
            const { id } = req.params
            const user = req.body.user
            const description = req.body.description
            const image = req.body.image
            const descriptionImg = req.body.descriptionImg

            await Publication.findByIdAndUpdate(id, { //busca por id para actualizar parametros de la publicacion
                user: user._id,
                description: description,
                image: image,
                descriptionImg: descriptionImg
            })
            res.json({ msg: 'Update' })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },

    //Eliminar Publicación
    deletePublication: async (req, res) => {
        try {
            const { id } = req.params
            await Publication.findByIdAndDelete(id)
            res.json({ msg: "Publication deleted" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // Dar like a una publicación
    likePublication: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            // Verifica si userId es un ObjectId válido
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'userId no es válido' });
            }

            const publication = await Publication.findById(id); //verifica si existe la publicación

            if (!publication) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }


            if (publication.likes.includes(userId)) {
                return res.status(400).json({ error: 'El usuario ya ha dado like a esta publicación' });
            }

            publication.likes.push(userId);
            await publication.save();
            console.log('Likes después de dar like:', publication.likes.length); // Agrega esta línea

            res.json({ msg: 'Like agregado correctamente', publication });
        } catch (error) {
            return res.status(500).json({ msg: 'Error al dar like a la publicación', error: error.message });
        }
    },

    // Quitar like a una publicación
    unlikePublication: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            // Verifica si userId es un ObjectId válido
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'userId no es válido' });
            }

            const publication = await Publication.findById(id);

            if (!publication) {
                return res.status(404).json({ error: 'Publicación no encontrada' }); //verifica si existe la publicación
            }

            if (!publication.likes.includes(userId)) { // valida la existencia del like para removerlo 
                return res.status(400).json({ error: 'El usuario no ha dado like a esta publicación' }); 
            }

            publication.likes = publication.likes.filter(user => user.toString() !== userId);
            await publication.save();
            console.log('Likes después de quitar like:', publication.likes.length); // Agrega esta línea
            res.json({ msg: 'Like quitado correctamente', publication });
        } catch (error) {
            return res.status(500).json({ msg: 'Error al quitar like a la publicación', error: error.message });
        }
    },

    getLikesForUser: async (req, res) => {
        try {
            const { userId } = req.params;

            // Realiza una búsqueda de las publicaciones que le gustan al usuario
            const likedPublications = await Publication.find({ likes: userId });

            // Extrae los identificadores de las publicaciones que le gustan al usuario
            const likedPublicationIds = likedPublications.map((publication) => publication._id);

            res.json(likedPublicationIds);
        } catch (error) {
            return res.status(500).json({ msg: 'Error al obtener los likes del usuario', error: error.message });
        }
    }

}

module.exports = controllerPublication