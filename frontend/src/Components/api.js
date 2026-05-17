import axios from "axios";
export function getProductData(id){
    return axios.get("https://myeasykart.codeyogi.io/product/"+id).then(function(response){
        return response.data;
    });
}

export function getProductByIds(ids){
    const commaSeparatedIds = ids.join();
    return axios.get("https://myeasykart.codeyogi.io/products/bulk",{
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

    return axios.get("https://myeasykart.codeyogi.io/products",{
        params,
    }).then(function(response){
        return response.data;
    });
}

export function saveCart(cart){
    return axios.post("https://myeasykart.codeyogi.io/carts",{data:cart},{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
    }).then(function(response){
        return response.data;
    })
}

export function getCart(){
    return axios.get("https://myeasykart.codeyogi.io/carts",{
        headers:{
            Authorization:localStorage.getItem("token"), 
        }
    }).then(function(response){
        return response.data;
    })
}