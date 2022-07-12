import React from 'react'
import { useTranslation } from 'react-i18next'
//components
import Category from './Category'

const HomeCategories = () => {
    const {t} = useTranslation()
    return (
        <div className="mt-5">
            {
                JSON.parse(sessionStorage.getItem('viewedProduct'))?.length !== 0 && <Category title={t("recentViewed")} recent />
            }
            <Category title={t("sneakerNew")} category='sneakers' link='/products?category=sneakers'/>
            <Category title={t("streetwearTrending")} category='streetwear' link='/products?category=streetwear'/>
        </div>
    )
}

export default HomeCategories
