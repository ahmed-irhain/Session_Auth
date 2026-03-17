import users from "../models/users.js"
export default async function profileController(req, res){
    const email = req.session
    const user = await users.findByEmail(email)
    res.send(user[0])
}
