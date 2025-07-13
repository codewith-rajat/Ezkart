import React from 'react';
import { useParams } from 'react-router-dom';
import allData from './AllData';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import Navbar from './Navbar';
import Footer from './Footer';

function Details() {
    const params = useParams();
    const id = params.id;

    let clickedItem;
    for (let i = 0; i < allData.length; i++) {
        const p = allData[i];
        if (id == p.id) {
            clickedItem = p;
            break;
        }
    }

    return (<div className='bg-stone-100 min-h-screen'>
    <Navbar />
        <div className='bg-stone-100 ' >
            <Link className='text-red-500 text-4xl' to={'/'} ><IoMdArrowRoundBack /></Link>
        </div>
        <div className='flex justify-center items-center bg-stone-100'>
            <div className='flex bg-white w-3/4 h-3/4'>
                <div className='p-8 w-1/2'>
                    <img className="object-contain h-full w-full max-h-[400px] shadow-lg" src={clickedItem.image} alt={clickedItem.name} />
                </div>
                <div className='w-1/2 pt-20'>
                    <h2 className='text-3xl font-medium ' >{clickedItem.name}</h2>
                    <p className='mt-4 text-xl font-bold' >${clickedItem.price}</p>
                    <p className='mt-4 mr-8' >{clickedItem.description}</p>
                    <div className='mt-6' >
                        <input type="text" value="1" className='border-2 border-gray-200 w-12 p-1' />
                        <button className='ml-2 bg-red-500 text-white px-12 py-2 rounded-lg' >Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default Details;