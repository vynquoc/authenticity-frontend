import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productApi from '../api/productApi'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
//components
import Product from '../features/Product/components/Product'

const Category = ({title, link, recent, category}) => {
    const {t} = useTranslation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const getProducts = async () => {
        try {
            if (category === 'sneakers') {
                const response = await productApi.getNewestSneakers()
                setProducts(response.data)
                setLoading(false)
            } else if ( category === 'streetwear') {
                const response = await productApi.getNewestStreetwear()
                setProducts(response.data)
                setLoading(false)

            } else if ( category === 'collectibles') {
                const response = await productApi.getNewestCollectibles()
                setProducts(response.data)
                setLoading(false)

            } else {
                const storageItem = sessionStorage.getItem('viewedProduct')
                const viewedProduct = JSON.parse(storageItem)
                let arr = []
                for (const obj of viewedProduct) {
                    arr.push(obj)
                }
                setLoading(false)

                setProducts(arr)
            }
        } catch (error) {
            setLoading(false)

            console.log(error.response)
        }
    } 
    useEffect(() => {
        getProducts()
       
    }, [getProducts])
    return (
        <div className="w-full mt-5">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-semibold">{title}</span>
                {
                    !recent && <Link to={link} className="text-sm font-medium">{t("seeAll")}</Link>
                }
            </div>
            <div className="grid grid-cols-5 gap-4">
                {/* {
                    products.map((product, index) => <Product 
                    key={index}
                    name={product?.name}
                    price={product?.averagePrice}
                    image={product?.images.smallImageUrl}
                    slug={product?.slug} 
                    />)
                } */}
                {
                    !loading ? products.map((product, index) => <Product 
                    key={index}
                    name={product?.name}
                    price={product?.averagePrice}
                    image={product?.images.smallImageUrl}
                    slug={product?.slug} 
                    />) : 
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
                    </>
                     
                }
            </div>
        </div>
    )
}

export default Category
