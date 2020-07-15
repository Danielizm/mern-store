import mongoose from 'mongoose';
import Product from '../models/productModel';
import express from 'express';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

/*router.get("/",async (req,res)=>{
	const products = await Product.find({});
	res.send(products);
});

router.get("/:id",(req,res)=>{
	const productId = req.params.id;
	const product = data.products.find(item=>item._id === productId);
	if(product){
	   res.send(product);
    }else{
    	res.status(404).send({msg:"Product Not Found"});
    }
});*/

router.post("/", async (req,res) => {
	const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
	});
	const newProduct = await product.save();
	if(newProduct){
		return res.status(201).send({msg:'New Product Created',data: newProduct});
	}
	return res.status(500).send({msg:'Error in creating product.'});
});

router.get("/create", async (req,res) => {
	const product = new Product({
    name: 'Pant',
    price: 60,
    image: '/images/p1.jpg',
    brand: 'Nike',
    category: 'pants',
    countInStock: 7,
    description: 'pant',
    rating: 4,
    numReviews: 10,
	});
	const newProduct = await product.save();
	if(newProduct){
		return res.status(201).send({msg:'New Product Created',data: newProduct});
	}
	return res.status(500).send({msg:'Error in creating product.'});
});

export default router;