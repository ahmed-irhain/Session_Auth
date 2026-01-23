import {hashPassword,comparePassword} from '../config/bcrypt.js';
import {users} from '../Users.json'
import {appendFile} from 'fs'

export async function SignUp (name, email, password){
    const hashedPassword = hashPassword(password);
    const user = new Object({
        name: name,
        email: email,
        password: hashedPassword
    })
    users.push(user)
    
    await appendFile('../Users.json', JSON.stringify(users),'utf8')

}