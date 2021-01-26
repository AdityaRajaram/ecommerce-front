import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import { createCategorySubmit } from './apiAdmin';


const AddCategory = () => {

    const [name, setName] = useState('');
    const [n,setN]=useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)


    //destructure user and token from localstorage

    const {user,token}=isAuthenticated();



    const handleChange=(e)=>{
        setError('');
        setName(e.target.value)
    }

    const clickSubmit=(e)=>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        createCategorySubmit({userId:user._id,token:token,category:{name}})
        .then(data=>{
            if(data.err)
            {
                setError(true);
            }
            else
            {
                setError('');
                setSuccess(true);
                setN(name)
                setName('')

            }
        })

    }


    useEffect(() => {
        setSuccess(false);
        setError('');
        setName('');
      
    }, [])

    const showSuccess=()=>{
        if(success)
        {
        return(
            <div className="text-success h3">{n} is created</div>
        )
        }
    }

    const showError=()=>{
        if(error)
        return(
            <div className="text-danger h3">Category should be unique.</div>
        )
    }

    const newCategoryForm=()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" type="text" onChange={handleChange} value={name} autoFocus/>

            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )

    return (
       <Layout title="Add a new category" description={`Good day ${user.name},ready to add new category`}>

           <div className="row">
    <div className="col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {newCategoryForm()}
        </div>
           </div>
       </Layout>
    )
}

export default AddCategory
