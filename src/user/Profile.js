import React,{useState,useEffect} from 'react'
import { Link,Redirect} from 'react-router-dom';
import { isAuthenticated } from '../auth'
import {read,update,updateUser} from './apiUser'
import Layout from '../core/Layout'

const Profile = ({match}) => {


   const [values,setValues]=useState({
       name:'',
       email:'',
       password:'',
       error:false,
       success:false
   });

   const {token}=isAuthenticated();

   const {name,email,password}=values;

   const init=(userId)=>{
       read(userId,token).then(response=>{
           if(response.err)
           {
               setValues({...values,error:response.err})
           }
           else
           {
               setValues({...values,name:response.name,email:response.email})
           }
       })

   }

   useEffect(()=>{
    init(match.params.userId)
   },[])


   const handleChange = name => e => {
    setValues({...values,
        error: false,
        [name] : e.target.value});
}

const clickSubmit = (e) => {
    e.preventDefault();
    
    update(match.params.userId, token, {name, email, password})
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            updateUser(data, () => {
                setValues({...values, 
                    name: data.name,
                    email: data.email,
                    success: true
                });
            })
        }
    })
}


   const profileUpdate = (name, email, password) => {
    return(
        <form>
            <div className='form-group'>
                <label className='text-muted'>
                    Name
                </label>
                <input
                    type='text'
                    className='form-control'
                    value={name}
                    onChange={handleChange('name')}>
                </input>
            </div>
            <div className='form-group'>
                <label className='text-muted'>
                    Email
                </label>
                <input
                    type='email'
                    className='form-control'
                    value={email}
                    onChange={handleChange('email')}>
                </input>
            </div>
            <div className='form-group'>
                <label className='text-muted'>
                    Password
                </label>
                <input
                    type='password'
                    className='form-control'
                    value={password}
                    onChange={handleChange('password')}>
                </input>
            </div>
            <button
                onClick={clickSubmit}
                className='btn btn-primary btn-block'>Submit
            </button>                            
        </form>
    );
}

const redirectUser = (success) => {
    if (success) {
        return(
            <Redirect to='cart'/>
        );
    }
}

    return (
        <Layout title="Profile Update" description="Upadte your profile" className="container">
            
        {profileUpdate(name,email,password)}
        {redirectUser(values.success)}
        </Layout>
    )
}

export default Profile
