import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Config from "../config.js"

export default {
  encryptPassword: async (pass) => {
    try {
      const jump = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(pass, jump);
      return password;
    } catch (error) {
        console.error("An error occurred while encrypting the password", error);
      return {
        error: true,
        message: error,
      };
    }
  },
  comparePassword: async (userPassword, dbPassword) => {
    try {
      const compare = await bcrypt.compare(userPassword, dbPassword);
      const data = compare
        ? true
        : { error: true, message: "Incorrect credentials" };
      return data;
    } catch (error) {
        console.error("An error occurred while comparing the user password", error);
      return {
        error: true,
        message: error,
      };
    }
  },
  createJWT: (info) => {
    try {
      const token = jwt.sign(info, Config.JWT_SECRET);
      return token;
    } catch (error) {
        console.error("An error occurred while creating the token", error);
      return {
        error: true,
        message: error,
      };
    }
  },
  verifyJWT: async (info) => {
    try {
      const verify = await jwt.verify(info, Config.JWT_SECRET);
      const data = !verify ? false : verify;
      return data;
    } catch (error) {
        console.error("An error occurred while verifying the token", error);
      return {
        error: true,
        message: error,
      };
    }
  },
};
