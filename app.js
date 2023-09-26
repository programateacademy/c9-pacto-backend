const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const user = require ('./routers/user')
const publication = require('./routers/PublicationsRou/publication')
const admin = require('./routers/auth')
const comments = require('./routers/PublicationsRou/comments')
const rolAdmin = require('./libs/initialSetup')

const app = express()
rolAdmin.createAdmin() //al iniciar la base por primera vez crea los roles
rolAdmin.adminprint() //imprime la creacion del primer Admin 

// configuracion CORS
app.use(cors({
    origin:"*",
    methods:"GET,HEAD,POST,PATCH,PUT,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// manejo de rutas
app.use('/users',user)
app.use('/publictpacto',publication)
app.use('/admins',admin)
app.use('/comments',comments)


module.exports = app