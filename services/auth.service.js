import { hashPassword, comparePassword } from "../config/bcrypt.js";
import database from "../Users.json" with { type: "json" };
import { readFile, appendFile, writeFile } from "fs/promises";

export async function SignUp(name, email, password) {
  const hashedPassword = await hashPassword(password);
  const user = new Object({
    name: name,
    email: email,
    password: hashedPassword,
  });
  database.users.push(user);

  try {
    await writeFile("../Users.json", JSON.stringify(database, null, 2), "utf8");
    return user;
  } catch (error) {
    throw new Error("Error saving user to database");
  }
}
export async function Login(email, password) {
  const ReadUsers = await readFile("../Users.json", "utf8");
  const user = JSON.parse(ReadUsers).users.find((user) => user.email === email);
  const validate = await comparePassword(password, user.password);
  if (validate) return true;
  else return false;
}
export default { SignUp, Login };