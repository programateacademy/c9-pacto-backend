const User = require('../../models/users/user')
const Form = require('../../models/users/formUser')

const formController = {

  create: async (req, res) =>{

    try {
        const {nameUser, lastName, descriptionUSer, phoneNumber, userId} = req.body

        const user = await User.findById(userId)
        if(!user){
          return res.status(404).json({error: "User not found"})
        }

        const saveForm =  new Form({
          user: userId,
          nameUser: nameUser,
          lastName: lastName,
          descripcionUser: descriptionUSer,
          phoneNumber
        })
        await saveForm.save()
        res.status(201).json(saveForm)

    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  getforid: async (req, res) =>{
    try {
        const {id} = req.params
        const userForm = await userForm.findById(id)
        res.json(userForm)
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  updateForm: async(req,res) =>{
    try {
      const {id} = req.params
      const {user,nameUser,lastName,descripcionUser,phoneNumber} = req.body

      const formUpdate = await Form.findByIdAndUpdate(id,{
        user: user._id,
        nameUser: nameUser,
        lastName: lastName,
        descripcionUser: descripcionUser,
        phoneNumber: phoneNumber
      })
      res.status(201).json(formUpdate)
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  delete: async (req, res) =>{
    try {
        const {id} = req.params
        await Form.findByIdAndDelete({id})
    } catch (error) {
      return res.status(406).json({msg: error.message})
    }
  }
}

module.exports = formController
