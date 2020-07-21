import express from 'express';
import Order from '../models/orderModel';
import {isAuth,isAdmin} from '../util';

const router = express.Router();

router.get("/",isAuth,isAdmin,async (req,res) => {
	try{
	const orders = await Order.find({}).populate('user');
	res.send(orders);
    }catch(error){
    	res.send({msg:error.message});
    }
});

router.post("/", isAuth, async (req,res) => {
	const newOrder = new Order({
		orderItems: req.body.orderItems,
		user: req.user._id,
		shipping: req.body.shipping,
		payment: req.body.payment,
		itemsPrice: req.body.itemsPrice,
		taxPrice: req.body.taxPrice,
		shippingPrice: req.body.shippingPrice,
		totalPrice: req.body.totalPrice
	});
	const newOrderCreated = await newOrder.save();
	if(newOrderCreated){
		res.status(201).send({msg:'New order created.',data:newOrderCreated});
	}
	res.status(500).send({msg:'Error in creating order'});
});

router.delete("/:id", isAuth,isAdmin,async (req,res) => {
	const deletedOrder = await Order.findById(req.params.id);
	if(deletedOrder){
		await deletedOrder.remove();
		res.send({msg:'Order deleted!'});
	}else{
		res.send({msg:'Error in deleting order!'});
	}
});

export default router;