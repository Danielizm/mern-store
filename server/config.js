import dotenv from 'dotenv';

dotenv.config();

export default {
	NODE_ENV:process.env.NODE_ENV || 'development',
	MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazoon',
	JWT_SECRET: process.env.JWT_SECRET || 'somethingsecrect',
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
	accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}