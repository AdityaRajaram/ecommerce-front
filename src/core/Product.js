import React,{useState,useEffect}from 'react'
import Layout from './Layout'
import {read, relatedList} from './apiCore'
import Card from './Card';
const Product = (props) => {

    const [product,setProduct]=useState([]);
    const [error,setError]=useState(false);
    const [relatedProducts,setRelatedProducts]=useState([])


    const loadSingle=(productId)=>{
        read(productId)
        .then(data=>{
            if(data.err)
            {
                setError(data.err)
            }
            else
            {
            setProduct(data);
            //related
            relatedList(data._id)
            .then(response=>{
                if(response.err)
                {
                    setError(response.err);
                }
                setRelatedProducts(response)
            })
            }
        })

    }
    useEffect(() => {
     
        const productId=props.match.params.productId;
        loadSingle(productId);

    }, [props])

    return (
        <Layout title={product.name && product.name} description={product.description && product.description} className="m-5">
           <div className="row">
                <div className="col-8">
                    <Card product={product} showViewButton={false}/>
                </div>
               
                <div className="col-4">
                    {relatedProducts && relatedProducts.map((p,i)=>(
                    <div>
                        <h2>Related Products</h2>
                        <Card product={p} key={i}/>
                    </div>))}
                  
   
                </div>
           </div>
            
        
    </Layout>
    )
}

export default Product
