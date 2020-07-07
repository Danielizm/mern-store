import React from 'react';
import data from '../data';
import {Link} from 'react-router-dom';

const ProductScreen = (props) => {
	const product = data.products.find(item=>item._id === props.match.params.id);
  return (
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
    	<li>Qty: <select><option>1</option><option>2</option><option>3</option></select></li>
    	<li><button className="button primary">Add to Cart</button></li>
    </ul>
    </div>
    </div>
    </div>
  )
}

export default ProductScreen;