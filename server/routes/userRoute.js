import User from '../models/userModel';
import express from 'express';
import {getToken,isAuth} from '../util';

const router = express.Router();

router.post("/signin",async (req,res)=>{
	const signinUser =  await User.findOne({email:req.body.email,password:req.body.password});
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

router.put("/:id",isAuth,async (req,res)=>{
	const user = await User.findById(req.params.id);
	if(user){
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;
	    const updatedUser = await user.save();
		res.send({
			_id:updatedUser._id,
			name:updatedUser.name,
			email:updatedUser.email,
			isAdmin:updatedUser.isAdmin,
			token:getToken(updatedUser)
		});
	}else {
    res.status(401).send({ message: 'User Not Found.' });
  }
});

export default router;