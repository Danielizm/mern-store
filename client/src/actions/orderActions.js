import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
} from '../constants/orderConstants';

const createOrder = (order) => async (dispatch,getState) => {
	try{
		dispatch({type:ORDER_CREATE_REQUEST,payload:order});
		const {userSignin:{userInfo}} = getState();
		const {data} = await axios.post('/api/orders', order, {headers:{Authorization:"Bearer " + userInfo.token}});
		dispatch({type:ORDER_CREATE_SUCCESS, payload:data});
	}
	catch(error){
		dispatch({type:ORDER_CREATE_FAIL, payload:error.message});
	}
};

export { createOrder };