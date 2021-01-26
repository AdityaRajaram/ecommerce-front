import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import { getProduct,updateProduct, getCategories } from './apiAdmin';


const UpdateProduct = ({match}) => {

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


    const initCategories=()=>{
        getCategories().then(data=>{
            if(data.err)
            {
                setValues({...values,error:data.err})
            }
            else{
                setValues({categories:data,formData:new FormData()});
            }
        })
    }


    const init=(productId)=>{
        getProduct(productId).then(data=>{
            if(data.err)
            {
                setValues({...values,error:data.err})
            }
            else{
                //populate state
                    setValues({...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category._id,
                    shipping:data.shipping,
                    quantity:data.quantity,
                    formData:new FormData()
                })
                initCategories();
            }
        })

    }

    useEffect(() => {
      init(match.params.productId);

    }, [])

    const handleChange=name=>event=>{

        const value=name==="photo"?event.target.files[0]:event.target.value;
        formData.set(name,value)
        setValues({...values,[name]:value});


    }

    const clickSubmit=(e)=>{
        e.preventDefault();
        setValues({...values,loading:true,error:''});
        console.log(JSON.stringify(values.name))
        updateProduct(match.params.productId,user._id,token,formData)
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
                <h3>{createdProduct} is updated</h3>
            </div>
        )
    }

    const redirectUser=()=>{
        if(redirectToProfile){
        if(!error)
        {
            return <Redirect to="/"/>
        }
    }
    }

    const newProductForm=()=>(

        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label htmlFor="Photo" className="text-muted">Photo</label>
                <input onChange={handleChange('photo')} type="file" name="photo" className="btn btn-secondary form-control-file" accept="image/*"/>
            </div>

            <div className="form-group">
                <label htmlFor="Name" className="text-muted">Name</label>
                <input  onChange={handleChange('name')} type="text" name="name" className="form-control" value={name}/>
            </div>

            <div className="form-group">
                <label htmlFor="Description" className="text-muted">Description</label>
                <textarea  onChange={handleChange('description')}  name="description" className="form-control" value={description}>
                </textarea>
            </div>
            
            <div className="form-group">
                <label htmlFor="Price" className="text-muted">Price</label>
                <input onChange={handleChange('price')}  type="number" name="price" className="form-control" value={price}/>
            </div>

            <div className="form-group">
                <label htmlFor="Quantity" className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" name="quantity" className="form-control" value={quantity}/>
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
            <button className="btn btn-outline-primary btn-block">Update Product</button>

        </form>
    )

    return (
        <Layout title="update the product" description={`Good day ${user.name},ready to update the product`}>
 
            <div className="row">
     <div className="col-md-8 offset-md-2">
         {showError()}
         {showSuccess()}
         {newProductForm()}
         {redirectUser()}
         </div>
            </div>
        </Layout>
     )
}

export default UpdateProduct
