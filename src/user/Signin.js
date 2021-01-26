import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Link, Redirect} from 'react-router-dom'
import {autenticate, isAuthenticated, signinSubmit} from '../auth/index'


const Signin = () => {
    const [values,setValues]=useState({
      email:'',
      password:'',
      error:'',
      loading:false,
      redirectTorefer:false
    })

    const {user}=isAuthenticated();

    const {email,password,loading,error,redirectTorefer}=values;

    const handleChange = name =>event=>{

      setValues({...values,error:false,[name]:event.target.value});
    }
   

    const formSubmit=(e)=>{
      e.preventDefault();
      setValues({...values,error:false,loading:true})
      signinSubmit({email:email,password:password})
      .then(data=>{
        if(data.error)
        {
          setValues({...values,error:data.error,loading:false});

        }
        else
        {
          autenticate(data,()=>{
            setValues({
              ...values,
              redirectTorefer:true
            })
          })
        }
      })
    }

    const showError=()=>(
      <div className="alert alert-danger" style={{display:error?'':'none'}}>
        {error}
      </div>
    )

    const showLoading=()=>
      loading &&(
          <div className="alert alert-info">
              <h2>Loading...</h2>

          </div>
          
    )
    const redirectUser=()=>{
        if(redirectTorefer){
           if(user.role===1)
           {
            return(<Redirect to='/admin/dashboard'/>)
           }
           else{
            return(<Redirect to='/user/dashboard'/>)
           }
        }
        if(isAuthenticated())
        {
          return(<Redirect to='/'/>)
        }
    }

    const signinForm =()=>(
      <form>
          <div className="form-group">
            <label htmlFor="email" className="text-muted">Email</label>
            <input type="email"onChange={handleChange('email')} className="form-control" value={email} />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="text-muted">Password</label>
            <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
          </div>

          <button type="submit" onClick={formSubmit} className="btn btn-primary">Submit</button>

      </form>

    );
    return (
        <Layout title="Signin" description="Signin now!" className="container col-md-8 offset-md-2">
         {showLoading()}
         {showError()}
         {signinForm()}
         {redirectUser()}
        </Layout>
    )
}

export default Signin
