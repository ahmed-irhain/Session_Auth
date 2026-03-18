import Redis from "ioredis";
import "dotenv/config";

const redis = new Redis({
  host: DB_REDIS_HOST,
  port: 6379,
});

export default redis;