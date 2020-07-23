import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
	name: {type:String,required:true},
	qty: {type:Number,required:true},
	image: {type:String,required:true},
	price: {type:Number,required:true},
	productId: {type: mongoose.Schema.Types.ObjectId,ref:'Cs-product',required:true}
});

const shippingSchema = new mongoose.Schema({
	address: {type:String,required:true},
	city: {type:String,required:true},
	postalCode: {type:String,required:true},
	country: {type:String,required:true}
});

const paymentSchema  = new mongoose.Schema({
	paymentMethod: {type:String,required:true}
});

const orderSchema = new mongoose.Schema({
	user: {type:mongoose.Schema.Types.ObjectId,ref:'Cs-user',required:true},
	orderItems : [orderItemSchema],
	shipping: shippingSchema,
	payment: paymentSchema,
	itemsPrice:{type:Number},
	taxPrice: {type:Number},
	shippingPrice: {type:Number},
	totalPrice: {type:Number},
	isPaid: {type:Boolean, default:false},
	paidAt: {type:Date},
	isDelivered: {type:Boolean, default:false},
	deliveredAt: {type:Date}
},{timestamps:true});

const Order = mongoose.model('Cs-order',orderSchema);

export default Order;