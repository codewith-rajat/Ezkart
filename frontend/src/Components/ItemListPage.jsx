import { useEffect, useState } from 'react';
import ItemsList from './ItemsList';
import NoMatching from './NoMatchingItems';
import { getProductList } from './api';
import Loading from './Loading';
import { Input } from './Input';
import { withUser } from './withProvider';
import { range } from 'lodash';
import { Link, useSearchParams } from 'react-router-dom';

function ItemListPage({ user }) {
    const [productData, setProductData] = useState();
    const [loading, setLoading] = useState(true);
    const [searchParams,setSearchParams] = useSearchParams();

    const params = Object.fromEntries([...searchParams]);
    let { query, sort, pageNumber } = params;

    query = query || '';
    sort = sort || 'default';
    pageNumber = +pageNumber || 1;

    useEffect(function () {
        let sortBy;
        let sortType;
        if (sort == 'title') {
            sortBy = 'title';
            sortType = 'asc';
        } else if (sort == 'pricelh') {
            sortBy = 'price';
            sortType = 'asc';
        } else if (sort == 'pricehl') {
            sortBy = 'price';
            sortType = 'desc';
        }
        const timer = setTimeout(()=>{
            getProductList({ sortBy, query, pageNumber, sortType })
            .then(function (response) {
                setProductData(response);
                setLoading(false);
            });
        },500)
        return () => clearTimeout(timer)
    }, [sort, query, pageNumber]);

    function handleQueryChange(event) {
        setSearchParams({...params,query:event.target.value,pageNumber:1});
    };
    function handleSortChange(event) {
        setSearchParams({...params,sort:event.target.value});
    };

    if (loading) {
        return (<Loading />);
    }

    return (
        <>
            {/* Header Section */}
            <div className="bg-white mt-12 md:mt-16 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 lg:px-9 py-6 md:py-12 gap-4">
                <span className='text-red-500 text-xl md:text-2xl font-medium text-center md:text-left'>Welcome, {user.fullName}</span>
                
                {/* Search and Sort Controls */}
                <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
                    <div className='flex items-center border-2 border-gray-500 rounded-md p-1 flex-1 sm:flex-none'>
                        <Input
                            id="search"
                            label="Search"
                            type="text"
                            name="search"
                            value={query}
                            placeholder='Search products...'
                            onChange={handleQueryChange} />
                    </div>
                    <select 
                        onChange={handleSortChange} 
                        name="sort" 
                        id="category" 
                        className='border-2 border-gray-500 p-2 rounded-md flex-1 sm:flex-none' 
                        value={sort} >
                        <option value="default">Default sort</option>
                        <option value="title">Sort by name</option>
                        <option value="pricelh">Sort by price: Low to High</option>
                        <option value="pricehl">Sort by price: High to Low</option>
                    </select>
                </div>
            </div>
            
            {/* Products Grid */}
            <div className="bg-white max-w-6xl mx-auto px-4 md:px-6 lg:px-9 py-6">
                {productData.data.length > 0 && <ItemsList products={productData.data} />}
                {productData.data.length == 0 && <NoMatching>No Matching Results Found</NoMatching>}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center md:justify-start py-8 md:py-16 bg-white max-w-6xl mx-auto px-4 md:px-6 lg:px-9 mb-20">
                <div className='flex flex-wrap gap-2 justify-center md:justify-start'>
                    {range(1, productData.meta.last_page + 1).map((pageNo) => (
                        <Link 
                            key={pageNo} 
                            to={"?" + new URLSearchParams({...params,pageNumber:pageNo})} 
                            className={"border-2 text-white px-3 md:px-6 py-1 md:py-2 rounded font-semibold transition-colors text-sm md:text-base " + 
                                (pageNo === pageNumber ? "bg-red-500 border-red-500" : "bg-red-400 border-red-400 hover:bg-red-500 hover:border-red-500")
                            }>
                            {pageNo}
                        </Link> 
                    ))}
                </div>
            </div>
        </>
    );
}
export default withUser(ItemListPage);