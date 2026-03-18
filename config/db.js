import {Pool} from "pg";
import "dotenv/config"

const pool = new Pool({
  user: DB_POSTGRES_USER,
  password: DB_POSTGRES_PASSWORD,
  host: DB_POSTGRES_HOST,
  database: DB_POSTGRES_NAME,
  port: 5432,
});

export default pool;