import React, {useEffect, useState} from 'react'
//components
import Product from '../features/Product/components/Product'

const RecentlyViewed = ({currentProduct}) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const storageItem = sessionStorage.getItem('viewedProduct')
        if (storageItem) {
            const viewedProduct = JSON.parse(storageItem).filter(prod => prod.id !== currentProduct.id)
            setProducts(viewedProduct)
        } else {
            setProducts([])
        }
    }, [currentProduct])
    
    return (
            <div className="grid grid-cols-5 gap-4">
               {
                    products.map(product => (
                     
                        <Product 
                        name={product.name}
                        price={product.averagePrice}
                        image={product.images.smallImageUrl}
                        slug={product.slug} 
                        />
              
                ))
               }
            </div>
                    
            
    )
}

export default RecentlyViewed
