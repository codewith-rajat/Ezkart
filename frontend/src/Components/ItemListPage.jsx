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
        getProductList({ sortBy, query, pageNumber, sortType }).then(function (response) {
            setProductData(response);
            setLoading(false);
        });
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
            <div className="bg-white mt-12 max-w-6xl mx-auto flex items-center justify-between px-9 py-12">
                <span className='mx-2 text-red-500 text-2xl font-medium'>Welcome, {user.fullName}</span>
                <div className='flex '>
                    <div className='flex items-center border-2 border-gray-500 rounded-md p-1 mr-2'>
                        <Input
                            id="search"
                            label="Search"
                            type="text"
                            name="search"
                            value={query}
                            placeholder='Search'
                            onChange={handleQueryChange} />
                    </div>
                    <label htmlFor="sort" className=" text-black font-semibold"></label>
                    <select onChange={handleSortChange} name="sort" id="category" className='mr-12 border-2 p-1 rounded-md' value={sort} >
                        <option value="default">Default sort</option>
                        <option value="title">Sort by name</option>
                        <option value="pricelh">Sort by price: Low to High</option>
                        <option value="pricehl">Sort by price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="bg-white max-w-6xl mx-auto">
                {productData.data.length > 0 && <ItemsList products={productData.data} />}
                {productData.data.length == 0 && <NoMatching>No Matching Results Found</NoMatching>}
            </div>
            <div className="flex mx-auto py-16 bg-white  gap-2 max-w-6xl mb-20">
                <div className='ml-10'>
                {range(1, productData.meta.last_page + 1).map((pageNo) => (
                    <Link 
                        key={pageNo} 
                        to={"?" + new URLSearchParams({...params,pageNumber:pageNo})} 
                        className={"hover:bg-red-500 hover:border-red-500 ml-2 border-red-400 border-4 text-white px-6 py-2 rounded " + 
                            (pageNo === pageNumber ? "bg-red-500 border-red-500" : "bg-red-400")
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