import Models from "../models/index.js";
const UserModel = Models.User;

export default {
  createUser: (user) => {
    try {
      UserModel.create(user);
      return true;
    } catch (error) {
      console.error("An error occurred while creating the user", error);
      return {
        error: true,
        message: error,
      };
    }
  },
  getUserByEmail: async (email) => {
    try {
      const user = await UserModel.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error("An error occurred while getting the user by email", error);
      return {
        error: true,
        message: error,
      };
    }
  },
  editUser: async (data) => {
    try {
      const user = await UserModel.update(data, {where: {email: data.email}});
      return true
    } catch (error) {
      console.error("An error occurred while updating the user", error);
      return {
        error: true,
        message: error,
      };
    }
  },
  getAllUsers: async (email) => {
    try {
      const users = await UserModel.findAll();
      return users;
    } catch (error) {
      console.error("An error occurred while getting all users", error);
      return {
        error: true,
        message: error,
      };
    }
  },
};
