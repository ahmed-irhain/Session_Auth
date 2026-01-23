import e from "express";
import { hashPassword, comparePassword } from "../config/bcrypt.js";
import database from "../Users.json" with { type: "json" };
import { readFile, appendFile } from "fs";

export async function SignUp(name, email, password) {
  const hashedPassword = await hashPassword(password);
  const user = new Object({
    name: name,
    email: email,
    password: hashedPassword,
  });
  database.users.push(user);

  await appendFile("../Users.json", JSON.stringify(database), "utf8");
}
export async function Login(email, password) {
  const ReadUsers = await readFile("../Users.json", "utf8");
  const user = JSON.parse(ReadUsers).users.find((user) => user.email === email);
  const validate = await comparePassword(password, user.password);
  if (validate) return true;
  else return false;
}
export default { SignUp, Login };