import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { getPurchaseHistory } from './apiUser';
import moment from 'moment'

const  UserDashboard = () => {


    const {user:{_id,name,email,role}}=isAuthenticated();

    const [error,setError]=useState(false)
    const [history,setHistory]=useState([])

    const {token}=isAuthenticated();
    const userId=_id;
    const init=(userId,token)=>{
        getPurchaseHistory(userId,token)
        .then(response=>{
            if(response.err)
            {
                setError(response.err)
            }
            else
            {
                setHistory(response);
            }
        })

    }


    useEffect(() => {
     init(userId,token);
    }, [])

    const userLinks=()=>{
        return(

            <div className="card mb-5">
                <div className="card-header h2">
                    User Links
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" key={1}>
                        <Link className="nav-link" to="/cart">My cart</Link>
                    </li>
                    <li className="list-group-item" key={2}>
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }



      
    const userInfo = () => {
        return(
        <div className='card mb-5'>
            <h3 className='card-header'>
                User Information
            </h3>
            <ul className='list-group'>
                <li className='list-group-item' key={1}>
                    {name}
                </li>
                <li className='list-group-item' key={2}>
                    {email}
                </li>
                <li className='list-group-item' key={3}>
                    {role === 1 ? 'Admin' : 'Registered user'}
                </li>
            </ul>
        </div>
        );
    }

    const purchaseHistory = (history) => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">
                    Purchase history
                </h3>
                <ul className="list-group">
                    <li className="list-group-item" key={1}>
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return(
                                            <div key={i}>
                                                <h6>
                                                    Product name: {p.name}
                                                </h6>
                                                <h6>
                                                    Product price: ₹{p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date: {moment(p.createdAt).format('DD/MM/yyyy')},
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };


    return (
        <Layout title="Dashboard" description="User Dashboard" className="container">
            
            <div className='row'>
                    <div className='col-3'>
                        {userLinks()}
                    </div>
                    <div className='col-9'>
                        {userInfo()}
                        {purchaseHistory(history)}
                    </div>
                </div>
        </Layout>
    )
}

export default UserDashboard
