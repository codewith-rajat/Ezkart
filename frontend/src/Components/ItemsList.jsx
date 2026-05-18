import {memo} from 'react';
import Items from './Items';
function ItemsList({ products }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 place-items-center w-full' >
            {products && products.map(function (item) {
                return (
                    <Items
                        key={item.id}
                        {...item}
                    />
                );
            })}
        </div>
    );
}
export default memo(ItemsList);