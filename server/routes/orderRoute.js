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

router.get("/mine",isAuth, async (req,res) => {
	try{
	const orders = await Order.find({user:req.user._id});
	res.send(orders);
    }catch(error){
    	res.send({msg:error.message});
    }
});

router.get("/:id", isAuth,async (req,res) => {
	const order = await Order.findById(req.params.id);
	if(order){
		res.send(order);
	}else{
		res.status(404).send({msg:'Order Not Found!'});
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

router.put("/:id/pay",isAuth,async (req,res)=>{
	const order = await Order.findById(req.params.id);
	if(order){
		order.isPaid = true;
		order.paidAt = Date.now();
		order.payment = {
			paymentMethod: 'paypal',
			paymentResult: {
              payerID: req.body.payerID,
              orderID: req.body.orderID,
              paymentID: req.body.paymentID
            }
		}
		const updatedOrder = await order.save();
		res.send({msg:"Order Paid",order:updatedOrder});
	}else{
		res.status(404).send({msg:"Order Not Found"});
	}
});


export default router;