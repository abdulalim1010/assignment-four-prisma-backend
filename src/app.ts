
import express from "express"

const app =express();
app.get("/",(req,res)=>{
    res.send("RentNest API is running...")
})


export default app;