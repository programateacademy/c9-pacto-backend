const {Admin} = require('../models/admin')
const User = require('../models/user')
const config = require('../config')

const rolAdmin ={
    createAdmin : async () =>{
    try{    
        const count = await Admin.estimatedDocumentCount()

        if (count > 0 ) return

        //creacion de los Roles
        const values = await Promise.all([
            new Admin({name: "user"}).save(),
            new Admin({name: "admin"}).save()
        ])
    
    console.log(values)
    }catch ( error){
        console.error(error)
    }
},

    adminprint : async () => {
        try {


            const userFound = await User.findOne({ email: config.ADMIN_EMAIL });
            console.log(userFound);

            if (userFound) return;

            
            const admin = await Admin.find({name: {$in:["admin"]}})

            // Concatenate ADMIN_NAMES and ADMIN_SURNAMES to create userName
            const userName = `${config.ADMIN_NAMES} ${config.ADMIN_SURNAMES}`;


            const userRegis = await User.create({
                names: config.ADMIN_NAMES,
                surNames: config.ADMIN_SURNAMES,
                userName,            
                email: config.ADMIN_EMAIL,
                password: config.ADMIN_PASSWORD,
                admin: admin.map((admins) =>admins._id)
            });

            console.log(`New user created: ${userRegis.email}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = rolAdmin

