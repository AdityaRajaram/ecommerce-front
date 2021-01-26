import React, { Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { isAuthenticated, signOut } from '../auth'
import { itemTotal } from './cartHelpers'


const isActive=(history,path)=>{
    if(history.location.pathname===path)
    {
        return {color:"#ff9900"}
    }
    else
    {
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) => {
    // console.log(history);
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/")} to="/" >Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/shop")} to="/shop" >Shop</Link>
                </li>

                <li className="nav-item">
    <Link className="nav-link" style={isActive(history,"/cart")} to="/cart" >Cart <sup>
        <small className="cart-badge">
        {itemTotal()}
        </small>
        </sup></Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role===0 &&(


                    <Fragment>
                          <li className="nav-item">
                            <Link className="nav-link" style={isActive(history,"/user/dashboard")} to="/user/dashboard" >Dashboard</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && isAuthenticated().user.role===1 && (


                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,"/admin/dashboard")} to="/admin/dashboard" >Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,"/admin/orders")} to="/admin/orders" >Orders</Link>
                    </li>
                </Fragment>
                
                )}

                {!isAuthenticated() && (

                    <Fragment>

                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(history,"/signup")}>Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(history,"/signin")}>Signin</Link>
                    </li>    

                    </Fragment>
                )}


                {isAuthenticated() &&(

                    <li className="nav-item">
                    <span className="nav-link" onClick={()=>signOut(()=>{
                        history.push("/");
                    })} style={{cursor:'pointer',color:'#ffffff'}}>Signout</span>
                    </li>
                )}

               

            </ul>
        </div>
    )
}

export default withRouter(Menu)
