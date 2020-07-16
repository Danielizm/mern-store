import React, {useState, useEffect}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {detailsProduct} from '../actions/productActions';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1);
	const productDetails = useSelector(state=>state.productDetails);
    const {product,loading,error} = productDetails;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(detailsProduct(props.match.params.id));
    },[]);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }
  return loading?<div>Loading</div>:error?<div>{error}</div>:
    <div>
    <div className="back-to-result"><Link to="/">Back to result</Link></div>
    <div className="details">
    <div className="details-image"><img src={product.image} alt="product"/></div>
    <div className="details-info">
    <ul className="">
    <li><h4>{product.name}</h4></li>
    <li>{product.rating} Stars ({product.numReviews} views)</li>
    <li><strong>${product.price}</strong></li>
    <li>Description:<br/>{product.description}</li>
    </ul>
    </div>
    <div className="details-action">
    <ul>
    	<li>Price: ${product.price}</li>
    	<li>Status: {product.status}</li>
    	<li>Qty: <select value={qty} onChange={(e)=>setQty(e.target.value)}>
        {[...Array(product.countInStock).keys()].map(item=>{
            return <option key={item+1} value={item+1}>{item+1}</option>
        })}
        </select></li>
    	<li>
        {product.countInStock>0?
        <button className="button primary" onClick={handleAddToCart}>Add to Cart</button>
        :<div>Out Of Stock</div>}
        </li>
    </ul>
    </div>
    </div>
    </div>
  
}

export default ProductScreen;