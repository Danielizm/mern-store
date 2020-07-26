import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import axios from 'axios';

/* const CLIENT = {
   sandbox:
     "your_sandbox_key",
   production:
     "your_production_key"
 };*/
 
 let CLIENT_ID;//"AVlVzxi4EDquuVx3k-tsXHFGEEIKySN6xINhGjEP4PgwxYYGAyFtSiGIG0jrCB3g0-87724zrkViiUQU";
 const getId = () => {
  return axios.get("/api/config/paypal").then((res)=>{CLIENT_ID = res.data;console.log(CLIENT_ID);});
 };
 fetch("/api/config/paypal")
      .then(res => CLIENT_ID = res.data);
   //process.env.PAYPAL_CLIENT_ID;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId:"",
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
     CLIENT_ID = this.state.clientId;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;


    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
    
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"Mercedes G-Wagon",
          amount: {
            currency_code: "AUD",
            value: this.props.amount
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      this.props.onSuccess(data, details);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && <div>Loading...</div>}

        {showButtons && (
          <div>

            <PayPalButton {...this.props} 
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

      </div>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?currency=AUD&client-id=${CLIENT_ID}`)(PaypalButton);
