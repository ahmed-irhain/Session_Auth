import db from '../config/db.js';

async function AddUser(name, email, password){
    try{
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])

    }catch (err){
        throw new Error({stack: "Failed to register",details: err})
    }
}

async function findByEmail(email){
    try{
        const result = await db.query('SELECT * FROM users WHERE email=$1', [email])
        if(result.rowCount === 0) throw new Error("email not found") 
        return result.rows

    } catch(err){
        throw ({stack: "Cannot find email",details: err, status: 400})
    }
}

export default {AddUser,findByEmail}