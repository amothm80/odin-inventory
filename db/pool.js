import pg from 'pg';
import 'dotenv/config'
const {Pool} = pg;
export default new Pool({
    host:process.env.DBHOST,
    user: process.env.DBUSER,
    database: "odin_inventory",
    password: process.env.DBPASSWORD,
    port: 5432
}) 