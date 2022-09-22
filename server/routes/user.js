const router = require("express").Router();
const {
    User,
    validate
} = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/api/users", async (req, res) => {
    try {
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt); 

        await new User({
            ...req.body,
            password: hashPassword
        }).save();
        res.status(201).send({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;