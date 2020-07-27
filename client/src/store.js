import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {productListReducer, productDetailsReducer, productSaveReducer,
productDeleteReducer,productReviewSaveReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import {userSigninReducer,userRegisterReducer,userUpdateReducer} from './reducers/userReducers';
import {orderCreateReducer,orderListReducer,orderDeleteReducer,orderDetailsReducer,orderPayReducer,myOrderListReducer} from './reducers/orderReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart:{cartItems,shipping:{},payment:{}},userSignin:{userInfo}};
const reducer =combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart:cartReducer,
	userSignin:userSigninReducer,
	userRegister:userRegisterReducer,
	userUpdate:userUpdateReducer,
	productSave:productSaveReducer,
	productDelete:productDeleteReducer,
	productReviewSave:productReviewSaveReducer,
	orderCreate:orderCreateReducer,
	orderList:orderListReducer,
	orderDelete:orderDeleteReducer,
	orderDetails:orderDetailsReducer,
	orderPay:orderPayReducer,
	myOrderList:myOrderListReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;