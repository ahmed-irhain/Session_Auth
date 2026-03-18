import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import users from "../models/users.js";

export async function SignUp(name, email, password) {
  const hashedPassword = await hashPassword(password);
  try {
    await users.AddUser(name, email, hashedPassword)
  } catch (error) {
    throw error
  }
}

export async function Login(email, passwordClaim) {
  try {
    const user = await users.findByEmail(email)
    const userPassword = user[0]["password"]
    const validate = await comparePassword(passwordClaim, userPassword);
    if (!validate){
      throw new Error({
        stack: "Unvalid credintials",
        status: 401,
      });
    }
  } catch (error) {
    throw error
  }
}
export default { SignUp, Login };