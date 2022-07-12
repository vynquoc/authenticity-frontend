import React from 'react'
import { Link } from 'react-router-dom'
const CategoriesBar = () => {
    return (
        <div className="w-full">
            <div className="text-center text-lg font-semibold py-1">
                <Link to="/products?category=sneakers">
                    <span className="mr-7">Sneakers</span>
                </Link>
                <Link to="/products?category=streetwear">
                    <span className="mr-7">Streetwear</span>
                </Link>
            </div>
        </div>
    )
}

export default CategoriesBar
