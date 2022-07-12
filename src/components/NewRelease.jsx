import React from 'react'

//components
import Product from './Product'
const NewRelease = () => {
    return (
        <div className="col-span-7">
             <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Tin mới nhất</h2>
                <p className="text-sm font-medium">Xem tất cả</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    )
}

export default NewRelease
