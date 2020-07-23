import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {update,logout} from '../actions/userActions';
import {listMyOrders} from '../actions/orderActions';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const userUpdate = useSelector(state=>state.userUpdate);
  const {loading,success,error} = userUpdate;
  const myOrderList = useSelector(state=>state.myOrderList);
  const {loading:loadingOrders,orders,error:errorOders} = myOrderList;
  useEffect(()=>{
  	if(userInfo){
  		setName(userInfo.name);
  		setEmail(userInfo.email);
  		setPassword(userInfo.password);
  		console.log(userInfo);
  	}
  	dispatch(listMyOrders());
  	return () => {};
  },[userInfo]);

  const submitHandler = (e) => {
  	e.preventDefault();
  	dispatch(update({userId:userInfo._id,name,email,password}));
  };
  const handleLogout = () => {
  	dispatch(logout());
  	props.history.push("/signin");
  };
  return (
    <div className="profile">
    <div className="profile-info">
    <div className="form">
    <form onSubmit={submitHandler}>
    <ul className="form-container">
    <li><h2>User Profile</h2></li>
    <li>{loading && <div>Loading...</div>}{error && <div>error</div>}{success && <div>Profile Saved Successfully</div>}</li>
    <li><label htmlFor="name">Name</label><input value={name} type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input></li>
    <li><label htmlFor="email">Email</label><input value={email} type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input></li>
    <li><label htmlFor="password">Password</label><input value={password || ''} type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input></li>
    <li><button type="submit" className="button primary">Update</button></li>
    <li><button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button></li>
    </ul>
    </form>
    </div>
    </div>
    <div className="profile-orders content-margined">
    {loadingOrders ? <div>Loading</div> : errorOders ? <div>{errorOders}</div> : 
    <table className="table">
    <thead><tr><th>ID</th><th>DATE</th><th>TOTAL</th><th>PAID</th><th>ACTIONS</th></tr></thead>
    <tbody>
    	{orders.map(order=>
    		<tr key={order._id}>
    		<td>{order._id}</td>
    		<td>{order.createdAt}</td>
    		<td>{order.totalPrice}</td>
    		<td>{order.isPaid}</td>
    		<td><Link to={"/order/" + order._id}>DETAILS</Link></td>
    		</tr>
    	)}
    </tbody>
    </table>
    }
    </div>
    </div>
  )
}

export default ProfileScreen;