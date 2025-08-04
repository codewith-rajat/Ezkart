import React, { useEffect, useState,useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from './Button';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { getProductData } from './api';
import Loading from './Loading';
import NotFound from './NotFound';

function Details({onAddToCart}) {
    const params = useParams();
    const id = +(params.id);
    const [product, setProduct] = useState();
    const [loading,setLoading] = useState(true);
    const [count,setCount] = useState(1);

    useEffect(function () {
        const promise = getProductData(id);
        promise.then(function (product) {
            setProduct(product);
            setLoading(false);
        }).catch(function(){
            setLoading(false);
        });
    }, [id]);

    const handleCountChange = useCallback(function (event){
        setCount(+event.target.value);
    },[]);
    const navigate = useNavigate();
    const handleButtonClick=useCallback(function (){
        setCount(1);
        onAddToCart(id,count);
        navigate(`/details/${id+1}`);
        setLoading(true);
    },[id,count,navigate,onAddToCart]);

    const handleCartCount = useCallback(function (){
        setLoading(true);
        setCount(1);
    },[]);

    if(loading){
        return <Loading />
    }
    if(!product){
        return <NotFound/>;
    }


    return (
        <>
            <Link className='text-red-500 text-4xl' to={'/'} ><IoMdArrowRoundBack /></Link>
            <div className='flex justify-center items-center bg-stone-100'>
                {id > 1 && <Link className='text-red-500' onClick={handleCartCount} to={"/details/" + (id - 1)}><IoMdArrowRoundBack />Prev</Link>}
                <div className='flex bg-white w-3/4 h-3/4'>
                    <div className='p-8 w-1/2'>
                        <img className="object-contain h-full w-full max-h-[400px] shadow-lg" src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className='w-1/2 pt-20'>
                        <h2 className='text-3xl font-medium ' >{product.title}</h2>
                        <p className='mt-4 text-xl font-bold' >${product.price}</p>
                        <p className='mt-4 mr-8' >{product.description}</p>
                        <div className='mt-6' >
                            <input type="number" value={count} onChange={handleCountChange} min={1} className='border-2 border-gray-200 w-12 p-1' />
                            <Button onClick={handleButtonClick} className='ml-2 bg-red-400 text-white px-12 py-2 rounded-lg hover:bg-red-500' >Add to Cart</Button>
                        </div>
                    </div>
                </div>
                <Link className='text-red-500' onClick={handleCartCount} to={"/details/" + (id + 1)}><IoMdArrowRoundForward />Next</Link>
            </div>
        </>
    );
}

export default Details;