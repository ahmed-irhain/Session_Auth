import db from '../config/db.js';

function AddUser(name, email, password){
    db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])
}

async function findByEmail(email){
    try{
        const result = await db.query('SELECT * FROM users WHERE email=$1', [email])
        return result.rows

    } catch(err){
        throw err;
    }
}