import Services from '../services/index.js';

export default {
    login: async (req, res) => {
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            const getUser = await Services.User.getUserByEmail(user.email)
            if(getUser == null) {
                return res.status(401).json({
                    error: true,
                    message: "User does not exist"
                })
            }
            if(!getUser.status){
                return res.status(401).json({
                    error: true,
                    message: "Your account is not active, please validate your email address"
                })
            }
            const comparePassword = await Services.Auth.comparePassword(user.password, getUser.password)
            if(comparePassword.error) {
                return res.status(401).json({
                    error: true,
                    message: "Incorrect credentials"
                })
            }
            const token = await Services.Auth.createJWT(user.email)
            return res.status(200).json({
                token,
                message: "Login successful"
            })
        } catch (error) {
            console.error("An error occurred while doing login", error)
            return res.status(500).json(error)
        }
    },
    signUp: async (req, res) => {
        try {
            let user = {
                ...req.body,
                status: false
            }
            const getUser = await Services.User.getUserByEmail(user.email)
            if(getUser != null) {
                return res.status(400).json({
                    error: true,
                    message: "This email is already registered."
                })
            }
            user.password = await Services.Auth.encryptPassword(user.password)
            Services.User.createUser(user)
            return res.status(200).json("User has been created")
        } catch (error) {
            console.error("An error occurred while doing sign up", error)
            return res.status(500).json(error)
        }
    }
}