import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import users from "../models/users.js";

export async function SignUp(name, email, password) {
  const hashedPassword = await hashPassword(password);
  await users.AddUser(name, email, hashedPassword)
}

export async function Login(email, passwordClaim) {
  const user = await users.findByEmail(email)
  const userPassword = user[0]["password"]
  const validate = await comparePassword(passwordClaim, userPassword);
  if (!validate) {
    throw ({
      stack: "Unvalid credintials",
      status: 401,
    });
  }
}
export default { SignUp, Login };