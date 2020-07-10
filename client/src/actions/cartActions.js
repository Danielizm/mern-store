import {CART_ADD_ITEM,CART_REMOVE_ITEM} from '../constants/cartConstants';
import axios from 'axios';
import Cookie from 'js-cookie';

const addToCart = (productId,qty) => async (dispatch, getState) => {
	try{
		const {data} = await axios.get("/api/products/"+productId);
		dispatch({type:CART_ADD_ITEM,payload:{
			productId:data._id,
			name:data.name,
			image:data.image,
			price:data.price,
			countInStock:data.countInStock,
			qty:qty
		}});
		const {cart:{cartItems}} = getState();
		Cookie.set("cartItems", JSON.stringify(cartItems));
	}
	catch(error){
	}

}

const removeFromCart = (productId) => async (dispatch,getState) => {
	try{
		dispatch({type:CART_REMOVE_ITEM,payload:productId});
		const {cart:{cartItems}} = getState();
		Cookie.set("cartItems", JSON.stringify(cartItems));
	}
	catch(error){
	}

}

export {addToCart,removeFromCart};