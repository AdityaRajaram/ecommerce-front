import React,{useState,useEffect}from 'react'
import Layout from './Layout'
import {createOrder, getBraintreeClientToken, processPayment} from './apiCore'
import Card from './Card';
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelpers';

const Checkout = ({products,refresh}) => {

    const [data,setData]=useState({
        success:false,
        clientToken:null,
        error:false,
        instance:{},
        address:'',
        loading:false
    })


    const userId=isAuthenticated() && isAuthenticated().user._id;
    const token=isAuthenticated() && isAuthenticated().token;
    let deliveryAddress = data.address;

    const getToken=(userId,token)=>{
        getBraintreeClientToken(userId,token)
        .then(data=>{
            if(data.err)
            {
                setData({...data,error:data.err})
            }
            else{
                setData({clientToken:data.clientToken})
            }
        })
    }

    useEffect(()=>{
        getToken(userId,token);
    },[])

    const getTotal=()=>{
        if(products.length>0)
        return products.reduce((current,next)=>{
            return current+next.count*next.price;
        },0);
        else{
            return 0;
        }
    }


    const buy=()=>{
        setData({loading:true})
        let nonce;
        let getNonce=data.instance.requestPaymentMethod()
        .then(data=>{
          
            nonce=data.nonce
            
            const paymentData={
                paymentMethodNonce:nonce,
                amount:getTotal(products)
            }
            processPayment(userId,token,paymentData)
            .then(response=>{
                const createOrderData = { 
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address:deliveryAddress
                }

                console.log(response)
                
                createOrder(userId,token,createOrderData);

                setData({success:response.success,loading:false})
                emptyCart(()=>{
                    refresh(true);
                    console.log("cart is empty")
                })
            })
            .catch(err=>{
                setData({error:err,loading:false})
            })

        })
        .catch(err=>{
            // console.log(err)
            setData({...data,error:err.message,success:false})
        })
    };



    const handleAddress = event => {
        setData({...data, address: event.target.value});
    }

    const showSuccess=(success)=>(
        <div className="alert alert-info" style={{display:success?"":'none'}}>
            Thanks! Your payment was successful.
        </div>
    )

    const showLoading=(loading)=>(
        <div className="alert alert-info" style={{display:loading?"":'none'}}>
            Loading...
        </div>
    )




    const showError=()=>(
        <div className="alert alert-danger" style={{display:data.error?"":'none'}}>
            {data.error}
        </div>
    )

    const showDropIn=()=>(
    <div onBlur={()=>setData({...data,error:"",success:false})}>

        <div>
            {data.clientToken!==null && data.clientToken!=='' && products.length>0?(
                <div className="container-fluid">
                        <div className='form-group mb-3'>
                            <label className='text-muted'>
                                Delivery address:
                            </label>
                            <textarea
                                onChange={handleAddress}
                                className='form-control'
                                value={data.address}
                                placeholder='Type your delivery address here'>
                            </textarea>
                        </div>
                    <DropIn options={{
                        authorization:data.clientToken
                    }} onInstance={instance=>(data.instance=instance)}/>
                    <button onClick={buy} type="button" className="btn btn-primary btn-block">Pay</button>
                </div>
            ):(null)}
        </div>
        </div>
        )
    

    const showCheckOut=()=>{
        return isAuthenticated()?
        (<div>
            <div>{showDropIn()}</div>
        </div>
         ):(
            <Link to="signup">
                <button type="button" className="btn btn-warning"> Signin to continue</button>
            </Link>
        )
    }


    return (
        <div>
           <h2>Total: ₹{getTotal()}</h2> 
           {showLoading(data.loading)}
           {showSuccess(data.success)}
           {showError()}
           {showCheckOut()}
        </div>
    )
}

export default Checkout
