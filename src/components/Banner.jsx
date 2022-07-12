import React from 'react'
import BannerImg from '../assets/images/BannerImage.jpg'
import { useTranslation } from 'react-i18next'
//components
import SearchBar from './SearchBar'
const Banner = ({home}) => {
    const {t} = useTranslation()
    return (  
        <div style={{backgroundImage: `url(${BannerImg})`}} className="flex flex-col items-center justify-center text-white h-auto py-36 h-fit-content bg-center bg-no-repeat bg-cover">
            <p className="text-5xl font-bold mb-5">{t("banner")}</p>
            <p className="text-5xl font-bold mb-5 py-4 px-5 bg-gray-500">Sneakers - Hypebeast</p>
            <SearchBar home={home}/>
        </div>
    )
}

export default Banner
