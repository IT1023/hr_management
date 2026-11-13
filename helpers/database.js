import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

let pool;

export default function database() {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: Number(DB_PORT),
      ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
      },
      connectionLimit: 1, // one per instance is enough in serverless
      enableKeepAlive: true,
    });
  }
  return pool;
}
