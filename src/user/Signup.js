import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signupSubmit} from '../auth/index'


const Signup = () => {
    const [values,setValues]=useState({
      name:'',
      email:'',
      password:'',
      error:'',
      success:false
    })

    const {name,email,password,success,error}=values;

    const handleChange = name =>event=>{

      setValues({...values,error:false,[name]:event.target.value});
    }
   

    const formSubmit=(e)=>{
      e.preventDefault();
      setValues({...values,error:false})
      signupSubmit({name:name,email:email,password:password})
      .then(data=>{
        if(data.error || (!data))
        {
          setValues({...values,error:data.error,success:false});

        }
        else
        {
          setValues({
            ...values,
            name:'',
            email:'',
            password:'',
            error:'',
            success:true
          })

        }
      })
    }

    const showError=()=>(
      <div className="alert alert-danger" style={{display:error?'':'none'}}>
        {error}
      </div>
    )

    const showSuccess=()=>(
      <div className="alert alert-success" style={{display:success?'':'none'}}>
        New account created. Please <Link to='/signin'>signin</Link>
      </div>
    )

    const signUpForm =()=>(
      <form>

          <div className="form-group">
            <label htmlFor="name" className="text-muted">Name</label>
            <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
          </div>

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
        <Layout title="SignUp" description="Sign up and continue" className="container col-md-8 offset-md-2">
         {showSuccess()}
         {showError()}
         {signUpForm()}
        </Layout>
    )
}

export default Signup
