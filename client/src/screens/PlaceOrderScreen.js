import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
//import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = (props) => {
	const cart = useSelector(state=>state.cart);
	const { cartItems, shipping, payment } = cart;
    if(!shipping.address){props.history.push("/shipping");}
    else if(!payment.paymentMethod){props.history.push("/payment");}
    const itemPrice = cartItems.reduce((a,c)=>{const b =c.price*10*c.qty; return a+b;},0);
    const shippingPrice = itemPrice > 100 ? 0 : 10;
    const taxPrice = itemPrice/10;
    const totalPrice = (itemPrice*10  + taxPrice*10)/100 + shippingPrice;
	const dispatch = useDispatch();
	const placeOrderHandler = () => {

	};
	useEffect(()=>{

	},[]);
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
        <li><button className="button primary full-width">Place Order</button></li>
        <li><h3>Order Summary</h3></li>
        <li><div>Items</div><div>${itemPrice/10}</div></li>
        <li><div>Shipping</div><div>${shippingPrice}</div></li>
        <li><div>Tax</div><div>${taxPrice/10}</div></li>
        <li><div>Order Total</div><div>${totalPrice}</div></li>
    </ul>
    </div>
    </div>
    </div>
  )
}

export default PlaceOrderScreen;