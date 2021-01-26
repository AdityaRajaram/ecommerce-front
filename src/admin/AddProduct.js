import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import { createCategorySubmit, createProductSubmit, getCategories } from './apiAdmin';


const AddProduct = () => {

    const {user,token}=isAuthenticated();

    const [values, setValues] = useState({

        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:'',

    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData,

    }=values;


    const init=()=>{
        getCategories().then(data=>{
            if(data.err)
            {
                setValues({...values,error:data.err})
            }
            else{
                setValues({...values,categories:data,formData:new FormData()});
            }
        })
    }

    useEffect(() => {
      init();
    }, [])

    const handleChange=name=>event=>{

        const value=name==="photo"?event.target.files[0]:event.target.value;
        formData.set(name,value)
        setValues({...values,[name]:value});


    }

    const clickSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        setValues({...values,loading:true,error:''})
        
        createProductSubmit({userId:user._id,token:token,product:formData})
        .then(data=>{
            if(data.err){
                setValues({...values,error:data.err})
            }
            else{
                setValues({...values,
                    loading:false,
                    error:'',
                    createdProduct:data.name,
                    name:'',
                    description:'',
                    price:'',
                    category:'',
                    shipping:'',
                    quantity:'',
                    photo:'',
                    formData:''
                
                })
            }
        })
        
    }

    const showError=()=>{
        return(
            <div className="alert alert-danger" style={{display:error?'':'none'}}>
                <h3>{error}</h3>
            </div>
        )
    }
    const showSuccess=()=>{
        return(
            <div className="alert alert-success" style={{display:createdProduct?'':'none'}}>
                <h3>{createdProduct} is created</h3>
            </div>
        )
    }

    const newProductForm=()=>(

        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label htmlFor="Photo" className="text-muted">Photo</label>
                <input onChange={handleChange('photo')} type="file" name="photo" className="btn btn-secondary form-control-file" accept="image/*"/>
            </div>

            <div className="form-group">
                <label htmlFor="Name" className="text-muted">Name</label>
                <input  onChange={handleChange('name')} type="text" name="name" className="form-control"/>
            </div>

            <div className="form-group">
                <label htmlFor="Description" className="text-muted">Description</label>
                <textarea  onChange={handleChange('description')}  name="description" className="form-control">
                </textarea>
            </div>
            
            <div className="form-group">
                <label htmlFor="Price" className="text-muted">Price</label>
                <input onChange={handleChange('price')}  type="number" name="price" className="form-control"/>
            </div>

            <div className="form-group">
                <label htmlFor="Quantity" className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" name="quantity" className="form-control"/>
            </div>

            <div className="form-group">
                <label htmlFor="Category" className="text-muted">Category</label>
                <select onChange={handleChange('category')}  className="form-control">
                    <option>Please select category</option>
                    {categories && categories.map((c,i)=>(
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>


            <div className="form-group">
                <label htmlFor="Shipping" className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')}  className="form-control">
                    <option >Please select option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    )

    return (
        <Layout title="Add a new product" description={`Good day ${user.name},ready to add new product`}>
 
            <div className="row">
     <div className="col-md-8 offset-md-2">
         {showError()}
         {showSuccess()}
         {newProductForm()}
         </div>
            </div>
        </Layout>
     )
}

export default AddProduct
