import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {productListReducer, productDetailsReducer, productSaveReducer,
productDeleteReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import {userSigninReducer,userRegisterReducer} from './reducers/userReducers';
import {orderCreateReducer,orderListReducer,orderDeleteReducer} from './reducers/orderReducers';
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
	productSave:productSaveReducer,
	productDelete:productDeleteReducer,
	orderCreate:orderCreateReducer,
	orderList:orderListReducer,
	orderDelete:orderDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;