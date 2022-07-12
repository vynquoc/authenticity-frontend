import React, { useEffect, useState } from 'react'
import productApi from '../../../api/productApi'
import {Helmet} from 'react-helmet'
//components
import Product from './Product'
import Pagination from '../../../components/Pagination'
import Skeleton from 'react-loading-skeleton'

const ProductContainer = ({filters, onFiltersChange}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        page: 1,
        totalProducts: 1
    })

 
    //CALL API
    const getProducts = async () => {
        setLoading(true)
        try {
            
            const response = await productApi.getAll(filters)
            setProducts(response.products)
            setPagination(response.pagination)
            
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    //HANDLE PAGINATION
    const handlePageChange = (newPage) => {
    
        onFiltersChange({
            ...filters,
            page: newPage.selected + 1
        })
    }
   
    useEffect(() => {   
        getProducts()
    }, [filters])
    return (
         <>
                <Helmet>
                    <title>Sản phẩm | Authenticity</title>
                </Helmet>         
                 <div className="col-span-10 grid grid-cols-4 gap-4 grid-flow-row">          
                 {
                    loading === false ?
                    products.map((product) => (
                         
                        <Product
                                key={product.name}
                                name={product.name}
                                price={product.averagePrice}
                                image={product.images?.smallImageUrl}
                                slug={product.slug}
                               
                                />
            
                   )):
                    <>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                        <div>
                            <Skeleton height={180} />
                            <Skeleton />
                            <p className="capitalize text-xs text-gray-500">Giá bán trung bình</p>
                            <Skeleton width={100} />
                        </div>
                      
                    </>
                 }
                 {
                   products.lenght !== 0 && <Pagination onPageChange={handlePageChange} pagination={pagination}/>   
                 }
             </div>
             
         </>
    )
}

export default ProductContainer
