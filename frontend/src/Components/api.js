import axios from 'axios'
import API_BASE_URL from '../config.js'

export function getProductData(id){
    return axios.get(`${API_BASE_URL}/products/${id}`).then(function(response){
        return response.data;
    });
}

export function getProductByIds(ids){
    if (!ids || ids.length === 0) {
        return Promise.resolve([]);
    }
    const commaSeparatedIds = ids.join();
    return axios.get(`${API_BASE_URL}/products/bulk`,{
        params:{
            ids:commaSeparatedIds,
        },
    }).then(function(response){
        return response.data;
    })
}
export function getProductList({sortBy,query,pageNumber,sortType}){

    let params={};
    if(sortBy){
        params.sortBy=sortBy;
    }
    if(query){
        params.search=query;
    }
    if(pageNumber){
        params.page=pageNumber; 
    }

    if(sortType){
        params.sortType=sortType;
    }

    return axios.get(`${API_BASE_URL}/products`,{
        params,
    }).then(function(response){
        return response.data;
    });
}

export function saveCart(cart){
    return axios.post(`${API_BASE_URL}/carts`,{data:cart},{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    }).then(function(response){
        return response.data;
    })
}

export function getCart(){
    return axios.get(`${API_BASE_URL}/carts`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`, 
        }
    }).then(function(response){
        return response.data;
    })
}