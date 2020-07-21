import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,
	ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_LIST_FAIL,
	ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL
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

const listOrder = () => async (dispatch,getState) => {
	try{
		dispatch({type:ORDER_LIST_REQUEST});
		const {userSignin:{userInfo}} = getState();
		const {data} = await axios.get('/api/orders', {headers:{Authorization:"Bearer " + userInfo.token}});
		dispatch({type:ORDER_LIST_SUCCESS, payload:data});
	}
	catch(error){
		dispatch({type:ORDER_LIST_FAIL, payload:error.message});
	}
};

const deleteOrder = (orderId) => async (dispatch,getState) => {
	try{
		dispatch({type:ORDER_DELETE_REQUEST, payload:orderId});
		const {userSignin:{userInfo}} = getState();
		const {data} = await axios.delete('/api/orders/' + orderId, {headers:{Authorization:"Bearer " + userInfo.token}});
		dispatch({type:ORDER_DELETE_SUCCESS, payload:data});
	}
	catch(error){
		dispatch({type:ORDER_DELETE_FAIL, payload:error.message});
	}
};

export { createOrder,listOrder,deleteOrder };