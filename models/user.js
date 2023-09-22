const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({
    userName: {
        type: String,
        maxLenth: 100
    },

    names:{
        type: String,
        required: true,
        maxLenth: 25
    },
    
    surNames:{
        type: String,
        required: true,
        maxLenth: 25
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
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required']
    },

    password: {
        type: String,
        required: true
    },

    typEntitySocialActor:{
        type: String,
    },
    
    companyNameOrentity:{
        type: String
    },

    phoneNumber:{
        type: Number,
        minLenth:3,
        maxLenth: 10
    },

    country:{
        type: String,
        default: "Colombia",
    },

    gender:{
        type: String
    },

    years:{
        type: Number,
        minLenth: 5,
        maxLenth: 100
    },

    ethnicity:{
        type: String
    },

    person:{
        type: String
    },

    admin:[{
        ref: "Admin", //Referecia a modelo de Admin
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
