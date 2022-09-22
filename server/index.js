require('dotenv').config
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')


connection()

//middleware
app.use(express.json())
app.use(cors())
//routes
app.use(userRoutes)
app.use(authRoutes)




const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log('server on port ' + port)
})