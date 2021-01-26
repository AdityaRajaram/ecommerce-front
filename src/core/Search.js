import React,{useState,useEffect} from 'react'
import { getCategories,list} from './apiCore'
import Card from './Card'

const Search = () => {

    const [data,setData]=useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    })

    const {categories,category,search,results,searched}=data;


    const loadCategories=()=>{
        getCategories().then(data=>{
            if(data.err)
            {
                console.log(data.err)
            }
            else{
                setData({...data,categories:data})
            }
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])



    const handleChange=name=>e=>{
       setData({...data,[name]:e.target.value,searched:false})

    }

    const searchData=()=>{
        if(search)
        {
            list({search:search || undefined, category:category})
            .then(response=>{
                if(response.err)
                {
                    console.log(response.err)
                }
                else{
                    setData({...data,results:response,searched:true})
                }
            })
        }

    }

    const searchMessage =(searched,results)=>{
        if(searched && results.length>0)
        {
            return `Found ${results.length} products`

        }
        if(searched && results.length<1)
        {
            return `No products found`

        }

    }
    const searchResults=(results=[])=>{
        return(
           <div>
               <h2 className="mt-4 mb-4">{searchMessage(searched,results)}</h2>
                <div className="row">
                 {results.map((product,i)=>(
                <Card product={product} key={i}/>
            ))}
            </div>
           </div>
           
        )

    }

    const searchSubmit=(event)=>{
        event.preventDefault();
        searchData();
    }

    const searchForm=()=>(

        <form onSubmit={searchSubmit}> 
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">All</option>
                            {categories.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search by name"/>
                    
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text">Search</button>
                </div>

            </span>
        </form>
    )

    return (
        <div className="row">
           <div className="container mb-3">
               {searchForm()}
           </div>
           <div className="container-fluid mb-3">
               {searchResults(results)}
           </div>
            
        </div>
    )
}

export default Search
