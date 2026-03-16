import db from '../config/db.js';

function AddUser(name, email, password){
    db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])
}
