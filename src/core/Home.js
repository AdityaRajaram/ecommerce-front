import React,{useState,useEffect}from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card';
import Search from './Search';


const Home = () => {

    const [productsByArrival, setProductsByArrival] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError] = useState(false)


    const loadProductsByArrival=()=>{
        getProducts('createdAt').then(data=>{
            if(data.err)
            {
                setError(data.err);
            }
            else{
                setProductsByArrival(data)
            }
        })
    }

    const loadProductsBySell=()=>{
        getProducts('sold').then(data=>{
            if(data.err)
            {
                setError(data.err);
            }
            else{
                setProductsBySell(data)
            }
        })
    }
    
    useEffect(() => {
       loadProductsByArrival();
       loadProductsBySell();
    }, [])

    return (
        <Layout title="Home page" description="Welcome to mern app">
            <Search/>

            <div className="container-fluid">
                <h2>New Arrival</h2>
                <div className="row">
               
                    {productsByArrival && productsByArrival.map((product,i)=>(
                     <div className="col-4 mb-2" key={i}>
                        <Card product={product}/>
                     </div>
                    ))}
                </div>
            </div>
           
           <div className="container-fluid">
                <h2>Best Sellers</h2>
                <div className="row">
                {productsBySell && productsBySell.map((product,i)=>( <div className="col-4 mb-2" key={i}>
                        <Card product={product}/>
                     </div>))}
                </div>
           </div>
          
        </Layout>
    )
}

export default Home
