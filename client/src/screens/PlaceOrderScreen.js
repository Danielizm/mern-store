import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = (props) => {
	const cart = useSelector(state=>state.cart);
	const { cartItems, shipping, payment } = cart;
    const orderCreate = useSelector(state=>state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    if(!shipping.address){props.history.push("/shipping");}
    else if(!payment.paymentMethod){props.history.push("/payment");}
    const tranPrice = cartItems.reduce((a,c)=>{const b =c.price*10*c.qty; return a+b;},0);
    const itemsPrice = tranPrice/10;
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number(Number(itemsPrice/10).toFixed(2));
    const totalPrice = (itemsPrice*10/10  + taxPrice) + shippingPrice;
	const dispatch = useDispatch();
	const placeOrderHandler = () => {
        dispatch(createOrder({orderItems: cartItems, shipping,payment,itemsPrice,shippingPrice,taxPrice,totalPrice}));
	};
	useEffect(()=>{
        if(success){props.history.push("/order/" + order.id);}
	},[success]);
  return (
    <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
    <div className="placeorder-info">
    <div>
        <h3>Shipping</h3>
        <div>{cart.shipping.address}, {cart.shipping.city},{cart.shipping.postalCode}, {cart.shipping.country}</div>
    </div>
    <div>
        <h3>Payment</h3>
        <div>Payment Method: {cart.payment.paymentMethod}</div>
    </div>
    <div>
    <ul className="cart-list-container">
    <li><h3>Shopping Cart</h3><div>Price</div></li>
    { cartItems.length === 0 ? <div>Cart is empty</div> :
    	cartItems.map(item =>
    		<li key={item.productId}>
    		<div className="cart-image"><img src={item.image} alt="product"/></div>
    		<div className="cart-name">
    		<div><Link to={"/product/"+item.productId}>{item.name}</Link></div>
    		<div>
    		Qty: {item.qty}
    		</div>
    		</div>
    		<div className="cart-price">${item.price}</div>
    		</li>
    		)
    }
    </ul>
    </div>
    </div>
    <div className="placeorder-action">
    <ul>
        <li><button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button></li>
        <li><h3>Order Summary</h3></li>
        <li><div>Items</div><div>${itemsPrice}</div></li>
        <li><div>Shipping</div><div>${shippingPrice}</div></li>
        <li><div>Tax</div><div>${taxPrice}</div></li>
        <li><div>Order Total</div><div>${totalPrice}</div></li>
    </ul>
    </div>
    </div>
    </div>
  )
}

export default PlaceOrderScreen;