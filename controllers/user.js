const User = require('../models/user')
const {Admin} = require('../models/admin')


const controllerUser = {

        //creacion de usuarios a la que solo el administrador tiene acceso
        create: async (req, res) => {
        try {
            const {userImg,email,password,admin, names, surNames} = req.body
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

            return res.status(200).json({savedUser})

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
