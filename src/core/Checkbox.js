import React,{useState,useEffect} from 'react'

const Checkbox = ({categories,handleFilters}) => {

    const [checked,setChecked] = useState([]);
     const handleToggle=c=>()=>{

        const currentCategoryId=checked.indexOf(c);
        const newCategoryId=[...checked]

        if(currentCategoryId===-1)
        {
            newCategoryId.push(c)
        }
        else
        {
            newCategoryId.splice(currentCategoryId,1);
         
        }
        setChecked(newCategoryId)
        handleFilters(newCategoryId);

     }

    return (
        categories.map((c,i)=>(
            <li key={i} className="list-unstyled">
                <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id)===-1} type="checkbox" className="form-check-input"/>
        <label className="form-check-label">{c.name}</label>
            </li>
        ))
     
    )
}

export default Checkbox
