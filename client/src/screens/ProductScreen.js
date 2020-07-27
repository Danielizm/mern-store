import React, {useState, useEffect}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {detailsProduct,saveProductReview} from '../actions/productActions';
import Rating from '../components/Rating';
import {PRODUCT_REVIEW_SAVE_RESET} from '../constants/productConstants';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1);
    const [rating,setRating] = useState(0);
    const [comment,setCommemt] = useState("");
	const productDetails = useSelector(state=>state.productDetails);
    const {product,loading,error} = productDetails;
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const productReviewSave = useSelector(state=>state.productReviewSave);
    const {success: productSaveSuccess} = productReviewSave;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(productSaveSuccess){
            alert('Review submitted successfully.');
            setRating(0);
            setCommemt('');
            dispatch({type:PRODUCT_REVIEW_SAVE_RESET});
        }
        dispatch(detailsProduct(props.match.params.id));
    },[productSaveSuccess]);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProductReview(props.match.params.id,{
            name:userInfo.name,
            rating:rating,
            comment:comment
        }));
    };
  return (
    <div>
    <div className="back-to-result"><Link to="/">Back to result</Link></div>
    {loading?<div>Loading</div>:error?<div>{error}</div>: (
    <React.Fragment>
    <div className="details">
    <div className="details-image"><img src={product.image} alt="product"/></div>
    <div className="details-info">
    <ul className="">
    <li><h4>{product.name}</h4></li>
    <li><a href="#reviews"><Rating value={product.rating} text={product.numReviews + (product.numReviews > 1 ? ' reviews' : ' review')}/></a></li>
    <li><strong>${product.price}</strong></li>
    <li>Description:<br/>{product.description}</li>
    </ul>
    </div>
    <div className="details-action">
    <ul>
    	<li>Price: ${product.price}</li>
    	<li>Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}</li>
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
    <div className="content-margined">
    <h2>Reviews</h2>
    {!product.reviews && <div>There is no review</div>}
        <ul className="review" id="reviews">
        {product.reviews && product.reviews.map((review)=> (
            <li key={review._id}>
            <div>{review.name}</div>
            <div><Rating value={review.rating}/></div>
            <div>{review.createdAt.substring(0,10)}</div>
            <div>{review.comment}</div>
            </li> ))} 
            <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                    <form onSubmit={submitHandler}>
                    <ul className="form-container">
                    <li>
                    <label htmlFor="rating">Rating</label>
                    <select name="rating" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)}>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very Good</option>
                        <option value="5">5- Excelent</option>
                    </select>
                    </li>
                    <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea name="comment" id="comment" value={comment} onChange={(e)=>setCommemt(e.target.value)}></textarea>
                    </li>
                    <li><button type="submit" className="button primary">Submit</button></li>
                    </ul>
                    </form> ) : (
                    <div>Please <Link to="/signin">Sign In</Link> to write review.</div>
                    )}
            </li>
       {/*} )} */ }
        </ul>
    </div>
    </React.Fragment>
    )}
    </div> );
  
}

export default ProductScreen;