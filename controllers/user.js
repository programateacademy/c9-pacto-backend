const User = require('../models/user')
const { Admin } = require('../models/admin')


const controllerUser = {

    //creacion de usuarios a la que solo el administrador tiene acceso
    create: async (req, res) => {
        try {
            const { userImg, email, password, admin, names, surNames } = req.body
            const adminFound = await Admin.find({ name: { $in: admin } })

            const userName = `${names} ${surNames}`

            const user = new User({
                userName,
                names,
                surNames,
                userImg,
                email,
                password,
                admin: adminFound.map((admins) => admins._id)  // asigna por defecto el rol Usuario
            })

            user.password = await User.encryptPassword(user.password) // antes de guardar la contraseña la encripta

            const savedUser = await user.save()

            return res.status(200).json({ savedUser })

        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    //Buscar todos los usuarios existentes
    getUser: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users.reverse())
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },


    // buscar usuarios especificos
    getUserById: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    updatedUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUserData = req.body;

            // Encuentra al usuario por su ID y actualiza sus datos
            const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
                new: true,
            });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Enviar el usuario actualizado como respuesta
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en la actualización del usuario' });
        }
    }
    ,
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            await User.findByIdAndDelete(id)
            res.json({ msg: 'Delete' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    }
}

module.exports = controllerUser
