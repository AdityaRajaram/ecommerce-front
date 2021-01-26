import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import Card from './Card';
import { getCart } from './cartHelpers';
import Product from './Product';
import Checkout from './Checkout';




const Cart = () => {


    const [items,setItems]=useState([]);
    const [refresh,setRefresh]=useState(false)


    useEffect(() => {
      setItems(getCart);
      setRefresh(false)
      
    },[refresh])
    const showItems=(items)=>{
        return (
           <div>
               <h2>Your cart has {`${items.length}`} items</h2>
               <hr/>
               {items.map((p,i)=>(
                
                       <Card product={p} key={i}  showCartButton={false} cartUpdate={true} showRemoveProductButon={true} refresh={(value = false) => {
                        setRefresh(value);
                    }}/>
               ))}

           </div> 
        )

    }


    

    const noItemMessage=()=>{
        return(
            <div className="container">
                <div className="mx-auto">
                No items in the cart<Link to="/shop">Continue shopping...</Link>
                </div>
            <br/>
        </div>
        )
    }

    return (
        <Layout title="Cart page" description="Your Cart">

       <div className="row">
           <div className="col-6">
             {items.length>0?showItems(items):noItemMessage()}
           </div>
           <div className="col-6">
               <h2 className="mb-4">Cart Summary</h2>
               <hr/>
            <Checkout products={items} refresh={(value = false) => {
                            setRefresh(value);
                        }}/>
           </div>
       </div>
      
    </Layout>
    )
}

export default Cart
