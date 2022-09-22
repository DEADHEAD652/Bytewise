const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi")

router.post("/api/auth", async (req, res) => {
	/*try {
		const  error  = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message })

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" })

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		)
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" })

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" }) 
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	} */ var {email,password}=req.body
    if(!email || !password )
    {
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
       }
        bcrypt.compare(password,savedUser.password)
        .then(match=>{
            if(match)
            {
                res.json({message:"Login Successfull"})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	})
	return schema.validate(data)
}

module.exports = router;
