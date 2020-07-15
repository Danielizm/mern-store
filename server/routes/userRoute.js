import mongoose from 'mongoose';
import User from '../models/userModel';
import express from 'express';
import {getToken} from '../util';

const router = express.Router();

router.post("/signin",async (req,res)=>{
	try{ const signinUser =  await User.findOne({email:req.body.email,password:req.body.password});}catch(error){console.log(error.message)};
	if(signinUser){
		res.send({
			_id:signinUser.id,
			name:signinUser.name,
			email:signinUser.email,
			isAdmin:signinUser.isAdmin,
			token:getToken(signinUser)
		});
	}else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

router.post("/register",async (req,res)=>{
	const user = new User({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password
	});
	try{ const newUser = await user.save(); }catch(error){console.log(error.message);};
	if(newUser){
		res.send({
			_id:newUser._id,
			name:newUser.name,
			email:newUser.email,
			isAdmin:newUser.isAdmin,
			token:getToken(newUser)
		});
	}else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});

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