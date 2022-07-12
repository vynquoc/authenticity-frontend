import React from 'react'
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'

const TranslateButton = () => {
    const { t, i18n } = useTranslation()
    console.log(i18n.language)
    const handleChange = (lang) => {
        i18n.changeLanguage(lang)
    }
    return (
        <div  className="fixed z-50  bottom-[70px] right-[40px] flex bg-white p-2 rounded-md">
            <button onClick={() => handleChange('vn')}  className={"flex items-center  " + (i18n.language === 'vn' && 'border-b-2 border-red-700')}>
            <ReactCountryFlag
                countryCode="VN"
                svg
            />  
            <span className="text-xs ml-1 font-semibold text-red-700">VN</span>
            </button>
            <button onClick={() => handleChange('en')} className={"flex items-center ml-1 " + (i18n.language === 'en' && 'border-b-2 border-blue-700')}><ReactCountryFlag
                countryCode="US"
                svg
            />  
            <span className="text-xs ml-1 font-semibold text-blue-700">EN</span></button>
        </div>
    )
}

export default TranslateButton
