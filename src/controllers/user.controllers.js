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
            if(user == null) {
                return res.status(400).json({
                    error: true,
                    message: "User not found"
                })
            }
            user.password = undefined;
            return res.status(200).json({
                user,
                message: "User found"
            })
        } catch (error) {
            console.error("An error occurred while getting user by token", error)
            return res.status(500).json(error)
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = {
                ...req.body
            }
            const update = await Services.User.editUser(user);
            if(update.error) {
                return res.status(500).json({
                    error: true,
                    message: "Error processing update request"
                })
            }
            return res.status(200).json("User updated")
        } catch (error) {
            console.error("An error occurred while updating the user", error)
            return res.status(500).json(error)
        }
    },
    getAllUsers: async (req, res) => {
        try {
            let users = await Services.User.getAllUsers()
            return res.status(200).json({
                users, 
                message: "Users found"
            })
        } catch (error) {
            console.error("An error occurred while getting all users", error)
            return res.status(500).json(error)
        }
    }
}