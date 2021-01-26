import {API} from '../config'

 export const signupSubmit=(user)=>{
   return fetch(`${API}/register`,{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(response=>{
      return response.json()
    })
    .catch(err=>{
      console.log(err);
    })

  };



  export const signinSubmit=(user)=>{
    return fetch(`${API}/login`,{
       method:"POST",
       headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
       },
       body:JSON.stringify(user)
     })
     .then(response=>{
       return response.json()
     })
     .catch(err=>{
       console.log(err);
     })
 
   };


   export const autenticate=(data,next)=>{
     if(typeof window !== 'undefined')
     {
      localStorage.setItem('jwt',JSON.stringify(data));
      next();
     }

   }

   export const signOut=(next)=>{

    if(typeof window !== 'undefined')
     {
      localStorage.removeItem('jwt');
      next();
      return fetch(`${API}/logout`,{
        method:"GET"
      })
      .then(response=>{
        console.log("logout",response)
      })
      .catch(err=>{
        console.log(err);
      })
     }

   }


   export const isAuthenticated=()=>{

    if(typeof window =='undefined')
    {
      return false;
    }
    if(localStorage.getItem('jwt'))
    {
      return JSON.parse(localStorage.getItem('jwt'));
    }
    else{
      return false;
    }
   }