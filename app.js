require('dotenv').config()
require('./config/database')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require("./middleware/auth");


const app = express()

app.use(express.json())


const User = require("./model/user")

// Register
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required")
        }




        encryptedPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        })


        const token = jwt.sign({
                user_id: user._id,
                email
            },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        )

        user.token = token


        res.status(201).json(user)
    } catch (err) {
        console.log(err)
    }

})

// Login
app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body


        if (!(email && password)) {
            res.status(400).send("All input is required")
        }

        const user = await User.findOne({
            email
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({
                    user_id: user._id,
                    email
                },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            )


            user.token = token


            res.status(200).json(user)
        }

    } catch (err) {
        console.log(err)
    }
})
//welcome
app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  })




module.exports = app