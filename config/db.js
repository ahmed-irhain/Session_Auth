import {Pool} from "pg";

const pool = new Pool({
    user: 'postgres',
    password: '2008',
    host: 'localhost',
    database: 'session_auth'
})

export default pool;