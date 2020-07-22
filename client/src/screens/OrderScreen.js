import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {detailsOrder,payOrder} from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';

const OrderScreen = (props) => {
	const orderPay = useSelector(state=>state.orderPay);
	const {loading:loadingPay,success:successPay,error:errorPay} = orderPay;
	const dispatch = useDispatch();
	const orderDetails = useSelector(state=>state.orderDetails);
	const {loading, order, error} = orderDetails;

	useEffect(()=>{
		if(successPay){props.history.push("/profile")}else{
		dispatch(detailsOrder(props.match.params.id));}
	},[successPay]);

	const handleSuccessPayment = (paymentResult) => {
		dispatch(payOrder({order,paymentResult}));
	};
    

  return ( loading ? <div>Loading...</div> : error ? <div>{error}</div> :
    <div className="placeorder">

    <div className="placeorder-info">
    <div><h3>Shipping</h3>
    <div>{order.shipping.address}, {order.shipping.city},{order.shipping.postalCode}, {order.shipping.country}</div>
    <div>{order.isDelevered ? "Delevered at " + order.deleveredAt : "Not Delevered"}</div>
    </div>
    <div><h3>Payment</h3>
    <div>Payment Method: {order.payment.paymentMethod}</div>
    <div>{order.isPaid ? "Paid at " + order.paidAt : "Not Paid"}</div>
    </div>
    <div>
    	<ul className="cart-list-container">
    	<li><h3>Shopping Cart</h3><div>Price</div></li>
    	{ order.orderItems.length === 0 ? <div>Cart is empty</div> : 
    		order.orderItems.map(item=>
    			<li key={item._id}>
    			<div className="cart-image"><img src={item.image} alt="product"/></div>
    			<div className="cart-name"><div><Link to={"/product/" + item.productId}>{item.name}</Link></div></div>
    			<div>Qty: {item.qty}</div>
    			<div className="cart-price">${item.price}</div>
    			</li>
    			)
    	}
    	</ul>
    </div>
    </div>

    <div className="placeorder-action">
    <ul>
    	<li className="placeorder-actions-payment">
    	{loadingPay && <div>Processing payment</div>}
    	{!order.isPaid && <PaypalButton amount={order.totalPrice} onSuccess={handleSuccessPayment}/>}
    	</li>
    	<li><h3>Order Summary</h3></li>
    	<li><div>Items</div><div>${order.itemsPrice}</div></li>
    	<li><h3>Shipping</h3><div>${order.shippingPrice}</div></li>
    	<li><h3>Tax</h3><div>${order.taxPrice}</div></li>
    	<li><h3>Order Total</h3><div>${order.totalPrice}</div></li>
    </ul>
    </div>

    </div>
  )
}

export default OrderScreen;