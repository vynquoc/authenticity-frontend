import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import jordan from '../assets/images/jordan.jpg'
import supreme from '../assets/images/supreme.jpg'
import yeezy from '../assets/images/yeezy.jpg'

import subJordan from '../assets/images/sub-jordan.jpg'
import subsupreme from '../assets/images/sub-supreme.jpg'

import nike from '../assets/images/nike.jpg'
import dunk from '../assets/images/dunk.jpg'
import adidas from '../assets/images/adidas.png'
const PopularBrand = () => {
    const {t} = useTranslation() 
    return (
        <div className="mt-7">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-semibold">{t("popular")}</span>
                <Link to="/products" className="text-sm font-medium">{t("seeAll")}</Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <Link to="/products?brand=jordan" className="relative cursor-pointer">
                    <img className="w-full" src={jordan} alt="jordan"/>
                    <img className="absolute right-5 w-1/4 top-0 min-h-[60px]" src={subJordan} alt="jordan" />
                </Link>
                <Link to="/products?brand=nike" className="relative">
                    <img className="w-full" src={dunk} alt="nike"/>
                    <img className="absolute right-5 w-1/4 top-0 min-h-[60px]" src={nike} alt="nike" />
                </Link> 
                <Link to="/products?brand=supreme" className="relative">
                    <img className="w-full" src={supreme} alt="supreme"/>
                    <img className="absolute right-5 w-1/4 top-0 min-h-[60px]" src={subsupreme} alt="supreme" />
                </Link>
                <Link to="/products?brand=adidas" className="relative">
                    <img className="w-full" src={yeezy} alt="adidas"/>
                    <img className="absolute right-5 w-1/4 top-0 min-h-[60px]" src={adidas} alt="adidas" />
                </Link>
            </div>
        </div>
    )
}

export default PopularBrand
