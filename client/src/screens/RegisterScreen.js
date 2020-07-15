import React,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../actions/userActions';

const RegisterScreen = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const userSigin = useSelector(state=>state.userRegister);
	const {loading,userInfo,error} = userSigin;
	const dispatch = useDispatch();
	useEffect(()=>{
		if(userInfo){
			props.history.push("/");
	}},[userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(name,email,password));
	};
  return (
    <div className="form">
    <form action="" onSubmit={submitHandler}>
    <ul className="form-container">
    <li><h2>Create Account</h2></li>
    <li>{loading && <div>Loading...</div>}{error && <div>{error}</div>}</li>
    <li><label htmlFor="name">Name</label><input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}}/></li>
    <li><label htmlFor="email">Email</label><input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/></li>
    <li><label htmlFor="password">Password</label><input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/></li>
    <li><label htmlFor="rePassword">Re-enter Password</label><input type="password" name="rePassword" id="rePassword" onChange={(e)=>{setRePassword(e.target.value)}}/></li>
    <li><button type="submit" className="button primary">Register</button></li>
    <li>Already have an account?<Link to="/signin">Sign In</Link></li>
    </ul>
    </form>
    </div>
  )
}

export default RegisterScreen;