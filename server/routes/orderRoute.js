import express from 'express';
import Order from '../models/orderModel';
import {isAuth} from '../util';

const router = express.Router();

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

export default router;