import React,{useState,useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem,updateItem,removeItem } from './cartHelpers'

const Card = ({product,showViewButton=true,showCartButton=true,cartUpdate=false,showRemoveProductButon=false,refresh}) => {


    const [redirect,setRedirect]=useState(false);
    const [count,setCount]=useState(product.count)

    const viewButton=(show)=>{
    
        return(
            show &&
            
        <Link to={`/product/${product._id}`}>
        <button className="btn btn-outline-primary m-2">View</button>
    </Link>)
          

    }

    const addToCart=()=>{
        addItem(product,()=>{
            setRedirect(true);
        })
    }

    const redirectToCart=()=>{
        if(redirect)
        {
            return <Redirect to="/cart"/>
        }
    }
    const cartButton=(showCartButton)=>{
        return(
        
        showCartButton &&
        <Link to="/cart">
        <button onClick={addToCart} className="btn btn-outline-warning m-2">Cart</button>
    </Link>


        )
    } 

    const showRemoveButton=(showRemoveProductButon)=>{
        return(
        
            showRemoveProductButon &&
        
        <button onClick={()=>{removeItem(product._id); refresh(true);}} className="btn btn-outline-danger m-2">Remove Product</button>    )
    } 




    const handleChange=productId=>event=>{
        setCount(event.target.value<1?1:event.target.value);
        refresh(true)
        if(event.target.value>1)
        {
            updateItem(productId,event.target.value)
        }


    }




    const updateQuantity=cartUpdate=>{
        
       return ( cartUpdate && (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>                        
                    </div>
                    <input type="number"  value={count} className="form-control" onChange={handleChange(product._id)}/>
                    
                </div>
            </div>
        )
       )
    }

    const stockMark=(quantity)=>{
        return quantity>0?<span className="badge badge-primary badge-pill m-2">In stock</span>:<span className="badge badge-warning badge pill m-2">Out of stock</span>


    }
    return (
            <div className="card">
                <div className="card-header name">
                    {product.name}
                </div>
                <div className="card-body">
                    {redirectToCart(redirect)}
                    <ShowImage item={product} url="products"/>
                    <p className="lead mt-2">{product.description}</p>
                    <p className="black-10">Price:₹{product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-9">Added on {moment(product.createdAt).fromNow()}</p>
                        {stockMark(product.quantity)}
                        <hr/>
                    {viewButton(showViewButton)}
                    {cartButton(showCartButton)}
                    {showRemoveButton(showRemoveProductButon)}
                    {updateQuantity(cartUpdate)}
                </div>
            </div>
            
    )
}

export default Card
