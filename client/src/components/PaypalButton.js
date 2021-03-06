import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//let Button = null;
function PaypalButton(props) {
  const [sdkReady, setSdkReady] = useState(false);
  window.React = React;
  window.ReactDOM = ReactDOM;
  const addPaypalSdk = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientID = result.data;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypal.com/sdk/js?currency=AUD&client-id=' + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script);
  }

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'AUD',
          value: props.amount
        }
      }
    ]
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

  useEffect(() => {
    if (window !== undefined && window.paypal === undefined) {
      addPaypalSdk();
    } else if (
      window !== undefined &&
      window.paypal !== undefined &&
      props.onButtonReady
    ) {
      props.onButtonReady();
    }
    
    return () => {
      //
    };
  }, [sdkReady]);

  if (!sdkReady) {
    return <div>Loading...</div>
  }

  const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });
  
  return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
    onApprove={(data, actions) => onApprove(data, actions)} />
}

export default PaypalButton;