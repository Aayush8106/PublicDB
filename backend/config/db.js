import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool}=pg;//taking Pool obj from pg

const pool=new Pool({ //creating pool var just to send query to db
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

pool.connect().then(()=>console.log("DB Success")).catch(err=>console.log("DB Error"));

export default pool;//pool is ready to send to other files