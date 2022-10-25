import Services from '../services/index.js';

export default {
    getUserByToken: async (req, res) => {
        try {
            const verifyJWT = await Services.Auth.verifyJWT(req.params.token)
            if(!verifyJWT || verifyJWT.error) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid JWT token"
                })
            }
            let user = await Services.User.getUserByEmail(verifyJWT)
            user.password = undefined;
            return res.status(200).json({
                user,
                message: "User found"
            })
        } catch (error) {
            console.error("An error occurred while getting user by token", error)
            return res.status(500).json(error)
        }
    }
}