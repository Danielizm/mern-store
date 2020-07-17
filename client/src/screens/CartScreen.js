import React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart,removeFromCart} from '../actions/cartActions';

const CartScreen = (props) => {
	const productId = props.match.params.id;
	const qty = props.location.search?Number(props.location.search.split("=")[1]):1;
	const cart = useSelector(state=>state.cart);
	const { cartItems } = cart;
	const total = cartItems.reduce((a,c)=>{const b = Number(c.price)*10*c.qty; return a+b;},0);
	const dispatch = useDispatch();
	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};
	const checkoutHandler = () => {
		props.history.push("/signin?redirect=shipping");
	};
	useEffect(()=>{
		if(productId){
			dispatch(addToCart(productId, qty));
		}
	},[]);

  return (
    <div className="cart">
    <div className="cart-list">
    <ul className="cart-list-container">
    <li><h3>Shopping Cart</h3><div>Price</div></li>
    { cartItems.length === 0 ? <div>Cart is empty</div> :
    	cartItems.map(item =>
    		<li key={item.productId}>
    		<div className="cart-image"><img src={item.image} alt="product"/></div>
    		<div className="cart-name">
    		<div><Link to={"/product/"+item.productId}>{item.name}</Link></div>
    		<div>
    		Qty: <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.productId, e.target.value))}>
    		{[...Array(item.countInStock).keys()].map(x=><option key={x+1} value={x+1}>{x+1}</option>)}
    		</select>
    		<button className="button" type="button" onClick={()=>removeFromCartHandler(item.productId)}>Delete</button>
    		</div>
    		</div>
    		<div className="cart-price">${item.price} <div>{Number(item.price)*10*item.qty/10}</div></div>

    		</li>
    		)
    }
    </ul>
    </div>
    <div className="cart-action">
    <h3>Subtotal ({cartItems.reduce((a,c)=>a+Number(c.qty),0)} items)
    : $ {total/10}
    </h3>
    <button className="button primary full-width" disabled={cartItems.length===0} onClick={checkoutHandler}>Proceed to Checkout</button>
    </div>
    </div>
  )
}

export default CartScreen;