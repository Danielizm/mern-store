import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PaypalButton = (props) => {
	const [sdkReady,setSdkReady] = useState(false);
	const [paypalLoaded, setPaypalLoaded] = useState(false);
	const addPaypalSdk = async () => {
		const result = await axios.get("/api/config/paypal");
		const clientId = result.data;
		const script = document.createElement('script');
		script.id = 'paypal-sdk';
		script.type = 'text/javascript';
		script.src='https://www.paypal.com/sdk/js?currency=AUD&client-id=' + clientId;
		script.async = true;
		script.onload = () => {setSdkReady(true)};
		document.body.appendChild(script);
	};

	const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'AUD',
          value: props.amount
        },
        /*shipping:{
        	name: props.name,
        	address:props.address
        },*/
      }
    ]
    });

    const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

    useEffect(()=>{
    	if(!window.paypal){addPaypalSdk();}
    	return () => {
    		/*const removedScript = document.getElementById('paypal-sdk');
    		document.body.removeChild(removedScript);*/
        };
    },[]);

    
  if(!sdkReady){
  return <div>Loading...</div>
  }
  const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });
  return <Button {...props} createOrder={(data, actions)=>createOrder(data, actions)} onApprove={(data, actions)=>onApprove(data, actions)} onButtonReady={() => {
                    setPaypalLoaded(true);
                  }}/>

}

export default PaypalButton;