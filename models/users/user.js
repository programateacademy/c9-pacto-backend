const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        maxLenth: 100
    },

    userImg: {
        type: String,
        required: false
    },

    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required']
    },

    password: {
        type: String,
        required: true
    },

    typEntitySocialActor: { // RECORDAR QUE MUCHAS DE ESTAS VALIDACIONES SON LISTAS DE DATOS STRING GUARDARLOS DENTRO DE UN ARRAY
                              //PARA CONSUMIRLOS EN EL FROND :) GRACIAS Y BUENAS NOCHES
      type: String
    },

    companyNameOrentity:{
      type: String
    },

    names:{
      type: String,
      required: true
    },

    surName:{
      type: String,
      required: true
    },

    phoneNumber:{
      type: Number,
      minLength: 3,
      maxLength: 13,
      required: true
    },

    gender:{
      type: String,
      required: true
    },

    years:{
      type: Number,
      required: true
    },

    ethnicity:{
      type: String
    },

    person:{
      type: String
    },

    admin:[{
        ref: "Admin",
        type: mongoose.Schema.Types.ObjectId
    }]

},{versionKey:false, timestamps:true});

userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
};

userSchema.statics.comparPassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password, receivedPassword)
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

module.exports = mongoose.model('User',userSchema)
