import {CART_ADD_ITEM,CART_REMOVE_ITEM} from '../constants/cartConstants';

const cartReducer = (state={cartItems:[]},action) => {
	switch (action.type){
		case CART_ADD_ITEM:
		const item = action.payload;
		const product = state.cartItems.find(i=>i.productId === item.productId);
		if(product){
			return {cartItems:state.cartItems.map(i=>i.productId === item.productId?item:i)};
		}else{
			return {cartItems:[...state.cartItems,item]};
		}
		case CART_REMOVE_ITEM:
		return {cartItems:state.cartItems.filter(i=>i.productId !== action.payload)}
		default:
		return state;
	}
}

export {cartReducer};