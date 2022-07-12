import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
const Product = ({name, price, image, slug, loading}) => {
    const {t} = useTranslation()
    return (
        <>
            
               
                <Link to={`/${slug}`}>
            <div className="bg-gray-100 flex flex-col h-full">
                <div className="p-10 bg-white border-gray-100 border-solid border-2">
                    {
                        
                       loading ?
                       <Skeleton height={50}/>
                      :
                       <img className="w-full" src={image} alt="product" />
                    }
                </div>
                <div className="py-2 px-3 flex-1 flex flex-col">
                    <div className="font-medium text-xs mb-2">{ name || <Skeleton count={2} />}</div>
                    <div className="mt-auto">
                        <p className="text-xs text-gray-500">{t("avgPrice")}</p>
                        <p className="text-xl font-semibold">$ {price ? price : '--'}</p>
                        {/* <p className="capitalize text-xs text-gray-500">29 đã bán</p> */}
                    </div>
                </div>
            </div>
        </Link>
            
        </>
    )
}

export default Product
