import mongoose from 'mongoose';
import User from '../models/userModel';
import express from 'express';

const router = express.Router();

router.get("/createadmin",async (req,res)=>{
	try{
		const user = new User({
		name:'Daniel',
		email:'jiacheng_su@hotmail.com',
		password:'1234',
		isAdmin:true
	    });
	    const newUser = await user.save();
	    res.send(newUser);
	}
	catch(error){
		res.send({msg:error.message});
	}
});

export default router;