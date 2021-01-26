import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'

const  AdminDashboard = () => {


    const {user:{_id,name,email,role}}=isAuthenticated();


    const adminLinks=()=>{
        return(

            <div className="card mb-5">
                <div className="card-header h2">
                    Admin Links
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" key={1}>
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item" key={2}>
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item" key={3}>
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item" key={4}>
                        <Link className="nav-link" to="/admin/manage/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description="Admin Dashboard" className="container">
            
        <div className="row">
            <div className="col-3">
                {adminLinks()}
            </div>
            <div className="col-9">
                <div className="card mb-5">
                    <div className="card-header h2">
                        User Information
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" key={3}>Name: {name}</li>
                        <li className="list-group-item" key={4}>Email: {email}</li>
                        <li className="list-group-item" key={5}>Type: {role===1?'Admin':'Registered User'}</li>
                    </ul>
                </div>

            </div>
           
        </div>
        </Layout>
    )
}

export default AdminDashboard
