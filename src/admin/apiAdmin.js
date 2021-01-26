
import {API} from '../config'

 export const createCategorySubmit =({userId,token,category})=>{
  var bearer = 'Bearer ' +token;
   return fetch(`${API}/category/create/${userId}`,{
      method:"POST",
      headers:{
        Authorization:bearer,
        Accept:'application/json',
        'Content-Type':'application/json'

      },
      body:JSON.stringify(category)
    })
    .then(response=>{
      return response.json()
    })
    .catch(err=>{
      console.log(err);
    })

  };



  export const createProductSubmit =({userId,token,product})=>{
    var bearer = 'Bearer ' +token;
     return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
          'Authorization':bearer,
  
        },
        body:product
      })
      .then(response=>{
        return response.json()
      })
      .catch(err=>{
        console.log(err);
      })
  
    };


    export const getCategories=()=>{
      return fetch(`${API}/categories`,{
        method:"GET"
      })
      .then(response=>{
        return response.json()
      })
      .catch(err=>{
        console.log(err)
      })
    };

  

    export const listOrders =(userId,token)=>{
      console.log(userId,token)
       return fetch(`${API}/order/list/${userId}`,{
          method:"GET",
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
    
          }
        })
        .then(response=>{
          return response.json()
        })
        .catch(err=>{
          console.log(err);
        })
    
      };


      export const getStatusValues = (userId, token) => {
        return(
            fetch(`${API}/order/status-values/${userId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },              
            })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
        );
    }
    
    export const updateOrderStatus = (userId, token, orderId, status) => {
        return(
            fetch(`${API}/order/${orderId}/status/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({status, orderId})
            })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
        );
    }
    

    export const getProducts = () => {
      return(
          fetch(`${API}/products?limit=100`, {
              method: "GET"       
          })
          .then(res => {
              return res.json();
          })
          .catch(err => {
              console.log(err);
          })
      );
  }
  
  export const getProduct = (productId) => {
      return(
          fetch(`${API}/product/${productId}`, {
              method: "GET"       
          })
          .then(res => {
              return res.json();
          })
          .catch(err => {
              console.log(err);
          })
      );
  }
  
  export const updateProduct = (productId, userId, token, product) => {
    console.log(JSON.stringify(product))
      return(
          fetch(`${API}/product/${productId}/${userId}`, {
              method: "PUT",
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`
              },
              body:product
          })
          .then(res => {
              return res.json();
          })
          .catch(err => {
              console.log(err);
          })
      );
  }
  
  export const deleteProduct = (productId, userId, token) => {
      return(
          fetch(`${API}/product/${productId}/${userId}`, {
              method: "DELETE",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          })
          .then(res => {
              return res.json();
          })
          .catch(err => {
              console.log(err);
          })
      );
  }