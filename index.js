//DEPENDENCY MODULES
const express = require('express')
const mongoose =  require('mongoose')
const database = require('./database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./routers/UserRoutes')

//CREATING AN INSTANCE OF EXPRESS
const app = express()

//CORE MIDDLEWARES
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//CUSTOM MIDDLEWARES
app.use(userRouter)

app.listen(process.env.BACKEND_PORT, ()=>{console.log(`\nSERVER RUNNING ON ${process.env.BACKEND_PORT}`); database()} )
