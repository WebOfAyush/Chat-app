import express from "express";
import {createClerkClient} from "@clerk/clerk-sdk-node"

const router = express.Router();


router.get("/signup", (req,res)=>{
    res.send("signup")
})
export default router;