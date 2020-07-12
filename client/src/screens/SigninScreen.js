import React,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {signin} from '../actions/userActions';

const SigninScreen = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userSigin = useSelector(state=>state.userSignin);
	const {loading,userInfo,error} = userSigin;
	const dispatch = useDispatch();
	useEffect(()=>{
		if(userInfo){
			props.history.push("/");
		}else{

		}
	},[userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email,password));
	};
  return (
    <div className="form">
    <form action="" onSubmit={submitHandler}>
    <ul className="form-container">
    <li><h2>Sign In</h2></li>
    <li>{loading && <div>Loading...</div>}{error && <div>{error}</div>}</li>
    <li><label htmlFor="email">Email</label><input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/></li>
    <li><label htmlFor="password">Password</label><input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/></li>
    <li><button type="submit" className="button primary">Signin</button></li>
    <li>New to here?</li>
    <li><Link to="/register/" className="button secondary text-center">Create your account</Link></li>
    </ul>
    </form>
    </div>
  )
}

export default SigninScreen;