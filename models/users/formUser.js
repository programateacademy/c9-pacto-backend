const mongoose = require('mongoose')

const Schema = mongoose.Schema


const formSchema = new Schema ({

    //Form user
    nameUser:{
      type: String
    },

    lastName:{
      type: String
    },

    descripcionUser:{
      type: String
    },

    phoneNumber:{
      type: Number
    },

    user:[{
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    }]

},{versionKey:false})

module.exports = mongoose.model('Form',formSchema)
