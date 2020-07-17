import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions';

const HomeScreen = (props) => {
	const [searchKeyword,setSearchKeyword] = useState('');
	const [sortOrder,setSortOrder] = useState('');
	const productList = useSelector(state=>state.productList);
	const {products,loading,error} = productList;
	const category = props.match.params.id ? props.match.params.id : '';
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(listProducts(category));
	},[category]);
    
    const submitHandler = (e) => {
    	e.preventDefault();
    	dispatch(listProducts(category,searchKeyword));
    }

    const sortHandler = (e) =>{
    	setSortOrder(e.target.value);
    	dispatch(listProducts(category,searchKeyword,sortOrder));
    };

  return <React.Fragment> {category && <h2>{category}</h2>}
  <ul className="filter">
  <li><form onSubmit={submitHandler}>
  <input type="text" name="searchKeyword" onChange={(e)=>setSearchKeyword(e.target.value)}/>
  <button className="button">Search</button>
  </form></li>
  <li>Sort By{' '}
  <select name="sortOrder" onChange={sortHandler}><option value="">Newest</option><option value="lowest">Lowest</option><option value="highest">Highest</option></select>
  </li>
  </ul>
  {loading ? <div>Loading...</div> : error ? <div>{error}</div> : 
    <ul className="products">
            {
              products.map(product=>(
                <li key={product._id}>
              <div className="product">
                  <Link to={"/product/"+product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                  </Link>
                <div className="product-name">
                <Link to={"/product/"+product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  {/*<Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />*/}
                <div className="product-rating">4.5 Stars (10 views)</div>
                </div>
              </div>
              
            </li>
              ))
            }
            </ul> }
    </React.Fragment>
}
export default HomeScreen;