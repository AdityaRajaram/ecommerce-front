import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
import {prices} from './fixedPrices'
import {getFilteredResults} from './apiCore'
import Card from './Card'

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error,setError]=useState(false);

    const [myFilters,setMyFilters]=useState({
        filters:{
            category:[],
            price:[]
        }
    })

    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(2);
    const [size ,setSize]=useState(0);
    const [filteredResults,setFilteredResults]=useState([]);
    const [ids,setIds]=useState([])

    const loadFilteredResults=(newFilters)=>{
        console.log(newFilters)
        getFilteredResults(skip,limit,newFilters)
        .then(data=>{
            if(data.err)
            {
                setError(data.err);
            }
            else
            {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0);

            }
        })
    }

    // const exceptList=(data)=>{
    //     let CatList=[]

    //     for(key in data)
    //     {
    //         for(k in )
    //     }

    // }

    const loadMore=()=>{
        let  toSkip=skip+limit;
        getFilteredResults(toSkip,limit,myFilters.filters)
        .then(data=>{
            if(data.err)
            {
                setError(data.err);
            }
            else
            {
                console.log(data.data[0]._id)
                setFilteredResults([...filteredResults,...data.data]);
                setSize(data.size)
                setSkip(toSkip);

            }
        })
    }

    const loadMoreButton=()=>{
        return(
            size>0 && size>=limit &&(
                <div>
                    <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button> 
                </div>
           
            )
        )
    }

    const init=()=>{
        getCategories().then(data=>{
            if(data.err)
            {
                setError(data.err)
            }
            else{
                setCategories(data)
            }
        })
    }

    useEffect(() => {
      init();
      loadFilteredResults(skip,limit,myFilters.filters)

    }, [])


    const handleFilters=(filters,filterBy)=>{
        const newFilters={...myFilters}
        newFilters.filters[filterBy]=filters

        if(filterBy=="price")
        {
           let prices=handlePrices(filters);
           newFilters.filters[filterBy]=prices

        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrices=(value)=>{
        const data =prices;
         
        let array=[]

        for(let key in data)
        {
            if(data[key]._id===parseInt(value))
            {
                array=data[key].array
            }
        }
        return array;

    }

    return (
        <Layout title="Shop page" description="Search and find your choice" className="container-fluid">

        <div className="row">
            <div className="col-4">
               <h4>Filter By Categories</h4>
                <ul>
                    <Checkbox categories={categories} handleFilters={filters=>{
                        handleFilters(filters,'category')
                    }}/>
                </ul>

                <h4>Filter by price range</h4>
                <ul>
                    <Radiobox prices={prices} handleFilters={filters=>{
                        handleFilters(filters,'price')
                    }}/>
                </ul>
             
            </div>
            <div className="col-8">
                <div className="row">
                        {filteredResults.map((product,i)=>(
                             <div className="col-4 mb-2" key={i}>
                             <Card product={product}/>
                          </div>
                        ))}
                </div>
                <hr/>
                {loadMoreButton()}
                
            </div>
        </div>
      
    </Layout>
    )
}

export default Shop
