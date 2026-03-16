import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import users from "../models/users.js";

export async function SignUp(name, email, password) {
  const hashedPassword = await hashPassword(password);
  try {
    await users.AddUser(name, email, hashedPassword)
  } catch (error) {
    throw new Error("Error saving user to database");
  }
}

export async function Login(email, passwordClaim) {
  const user = await users.findByEmail(email)
  const userPassword = user[0]["password"]
  const validate = await comparePassword(passwordClaim, userPassword);
  if (validate) return true; 
  else return false;
}
export default { SignUp, Login };