import express from "express";
import dotenv from "dotenv";
import path from "path";
import pool from "./config/db.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

//making frontend visible
app.use(express.static(path.resolve("frontend")));
app.use(express.json());//to parse json data
app.use(express.urlencoded({extended:true}));//parsing data recivied from uzer

const createTable = async ()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS data(
             id SERIAL PRIMARY KEY,
             uid INT,
             name VARCHAR(100),
             title VARCHAR(50),
             description VARCHAR(255)
            );
        `);
        console.log("Table Ready.");
        app.listen(PORT,()=>{
        console.log(`Server Started on port:${PORT}.`);
        });

    }
    catch(err)
    {console.log("DB_error",err)};
}

createTable();//creating table and also starting server

//routes
app.get("/",(req,res)=>{
  res.sendFile(path.resolve("frontend/home.html"));
});

//adding data in databsase
app.post("/add.html",async(req,res)=>{
    try{

        const {uid,name,title,textarea}=req.body;

        await pool.query(`
            INSERT INTO data(uid,name,title,description)
            VALUES($1,$2,$3,$4)`,[uid,name,title,textarea]
            );

            console.log("Data Inserted.");
            res.redirect("/");

    }
    catch(error){
        console.log(error);
        res.status(500).send("Insertion Failed");
    };
});

//fetching everything
app.get("/api/data",async(req,res)=>
{
    try{

       const result= await pool.query("SELECT * FROM data");
       res.json(result.rows);

    }catch(error){
     console.log(error);
     res.status(500).send("Error in Fetching Data");
    }
});

//fetching only req data
app.get("/api/data/:id",async(req,res)=>{
    try{

        const{id}=req.params;//storing id from parameter and using it for fetching data

        const result=await pool.query(`SELECT * FROM data WHERE id=$1`,[id]);//storing data from requested id

        res.json(result.rows[0]);

    }catch(error){
        console.log(error);
        res.status(500).send("Error in Fetching single Data.");
    }
});

//deleteing existing data\
app.delete("/api/data/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM data WHERE id = $1",
      [id]
    );

    res.json({ message: "Deleted Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send("Delete Failed");
  }
});

//updating existing data
app.put("/api/data/:id", async (req,res) => {

  try {

    const { id } = req.params;
    const { uid, name, title, textarea } = req.body;

    await pool.query(
      `UPDATE data
       SET uid=$1,
           name=$2,
           title=$3,
           description=$4
       WHERE id=$5`,
      [uid,name,title,textarea,id]
    );

    res.json({message:"Updated Successfully"});

  } catch(error) {
    console.log(error);
    res.status(500).send("Update Failed");
  }

});