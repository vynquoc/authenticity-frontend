import React, { useState, useEffect, useRef } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import productApi from '../api/productApi'
import { useTranslation } from 'react-i18next'

const SearchBar = ({home}) => {
    const history = useHistory()
    const {t} = useTranslation()
    const [keyword, setKeyword] = useState('')
    const [results, setResults] = useState([])
    const [hide, setHide] = useState(true)
    const typingTimeOutRef = useRef(null)

   
    const handleKeywordChange = (event) => {
        if (event.target.value === "") setResults([])
        setHide(false)
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        const kw = event.target.value.trim().toLowerCase()
        typingTimeOutRef.current = setTimeout(() => {
            setKeyword(kw)
        }, 500);
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter' && keyword) {
            history.push(`/search?s=${keyword}`)
        }
    }
    const handleSearchClick = () => {
        if (keyword) history.push(`/search?s=${keyword}`)
    }
    const handleHideList = () => {
        setHide(!hide)
    }
    const searchProducts = async () => {
        try {
            const response = await productApi.searchProducts(keyword)
          setResults(response.products)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
       if (keyword) {
        searchProducts()
       }
    }, [keyword])
    return (
        <div className="relative">
            <div className={"flex justify-center items-center text-black bg-white py-2 px-3 " + (home === true ? " border-0 " : ' border-[1px] border-gray-300')}>
                <div className="text-lg mr-4 cursor-pointer" onClick={handleSearchClick}>
                    <FaSearch />
                </div>
                <input className="text-sm border-none outline-none w-96" placeholder={t("searchbar")} type="text" onChange={handleKeywordChange} onKeyDown={handleEnter} onFocus={() => handleHideList(false)} />
            </div>
            <div className={"absolute bg-white z-50 text-black  w-full shadow-lg max-h-[200px] overflow-y-auto " + (hide ? "hidden" : "")}>
            {
                results.map(product => (
                   <Link to={`/${product.slug}`} onClick={handleHideList}>
                        <div key={product.id} className="flex items-center border-b-[1px] py-4 pl-2">
                            <div className="w-[100px] mr-2">
                                <img src={product.images.smallImageUrl} alt="product" />
                            </div>
                            <div>
                                <p className="text-xs">{product.brand.name}</p>
                                <p className="text-sm font-bold">{product.name}</p>
                                <p className="text-xs font-semibold">{product.colorway}</p>
                            </div>
                        </div>
                   </Link>
                ))
            }
            </div>
        </div>
    )
}

export default SearchBar
