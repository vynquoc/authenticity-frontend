import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc"
import { useTranslation } from 'react-i18next'
import productApi from '../../../api/productApi'
//component
import SizeOptions from './SizeOptions'
import ProductSizeInfo from './ProductSizeInfo'
import Skeleton from 'react-loading-skeleton'

const BuySellContainer = ({slug, loading}) => {
    const [currentSize, setCurrentSize] = useState('4')
    const [view, setView] = useState("")
    const asks = useSelector(state => state.currentProductDetail.productDetail?.lowestAsks)
    const bids = useSelector(state => state.currentProductDetail.productDetail?.highestBids)
    const product = useSelector(state => state.currentProductDetail.productDetail?.product)
    const [lastSale, setLastSale] = useState(null)
    const [currentAsk, setCurrentAsk] = useState({})
    const [currentBid, setCurrentBid] = useState({})
    const [toggle, setToggle] = useState(false)
    const {t} = useTranslation()

    const handleChangeSize = (size) => {
        const ask = asks.find(a => a._id === size)
        const bid = bids.find(b => b._id === size)
        setCurrentSize(size)
        setCurrentAsk(ask)
        setCurrentBid(bid)
    }
    const getLastSale = async () => {
        try {
            const response = await productApi.getLastSale(product._id, currentSize)
            console.log(response)
            let comparePrice
            let percent
            if (response.lastSale && currentAsk) {
                if (response.lastSale > currentAsk.price) {
                   
                    comparePrice = response.lastSale - currentAsk.lowestPrice
                    percent = comparePrice / response.lastSale * 100
                    setLastSale({
                        price: response.lastSale,
                        increase: parseInt(comparePrice) > 0,
                        comparePrice: comparePrice,
                        percent: percent.toFixed(2)
                    })
                } else {
                 
                    comparePrice = currentAsk.lowestPrice - response.lastSale
                    percent = comparePrice / response.lastSale * 100
                    setLastSale({
                        price: response.lastSale,
                        increase: parseInt(comparePrice) > 0,
                        comparePrice: comparePrice,
                        percent: percent.toFixed(2)
                    })
                }
                
            } else {
                setLastSale(null)
            }
           
            
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleView = (view) => {
        handleToggle()
        setView(view)
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }
    useEffect(() => {
     if(product) {
         
        if (product.category.name === 'sneakers') {
            setCurrentSize('4')
        } else if (product.category.name === 'streetwear') {
            setCurrentSize('S')
        }
     }
    }, [product])

    useEffect(() => {
        getLastSale()
    }, [currentSize])
   
    return (
        <>
          <div className="p-4 border-[1px] border-gray-400 rounded-md">
            
            {!loading ? <SizeOptions handleChangeSize={handleChangeSize} currentSize={currentSize}/> : <Skeleton width={380} height={30} style={{marginBottom: '10px'}} />}
           
            <div className="flex items-center mb-3">
                <Link to={`/buy/${slug}?size=${currentSize}`} className="bg-red-600 rounded-lg text-white py-2 px-8 text-center mr-5">
                    <p className="font-bold tracking-tight leading-3">{t("productDetail.buyOrBid.1")}</p>
                    <p className="text-[10px] my-[2px]">{t("productDetail.buyOrBid.2")}</p>
                    <p className="text-[12px] leading-3 font-semibold tracking-tight">{t("productDetail.buyOrBid.3")}</p>
                </Link>
                <div>
                    <p className="text-gray-500 text-xs">{t("productDetail.lowestAsk")}</p>
                    <p className="font-semibold text-xl">{currentAsk?.lowestPrice ? `$${currentAsk.lowestPrice}` : '--' }</p>
                </div>
            </div>

            <hr className="border-t mb-3"/>

            <div className="flex items-center">
                <Link to={`/sell/${slug}?size=${currentSize}`} className="bg-green-700 rounded-lg text-white py-2 px-9 text-center mr-5">
                    <p className="font-bold leading-3 tracking-tight">{t("productDetail.sellOrAsk.1")}</p>
                    <p className="text-[10px] my-[2px]">{t("productDetail.sellOrAsk.2")}</p>
                    <p className="text-[12px] leading-3 font-semibold tracking-tight">{t("productDetail.sellOrAsk.3")}</p>
                </Link>
                <div>
                    <p className="text-gray-500 text-xs">{t("productDetail.highestBid")}</p>
                    <p className="font-semibold text-xl">{currentBid?.highestPrice ? `$${currentBid.highestPrice}` : '--' }</p>
                </div>
            </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
            <div className="mr-1">
                <p className="text-xs font-semibold">{t("productDetail.latestSale")}: </p>
                <p className="text-base font-semibold">$ {lastSale?.price ? lastSale?.price : '--'}</p>
                {
                  lastSale?.increase === false ?
                    <div className="text-red-600 text-sm font-bold flex items-center">
                        <VscTriangleDown />
                        <p className="mx-1">${lastSale?.comparePrice}</p>
                        <span>({lastSale?.percent}%)</span>
                    </div>
                      : 
                      <div className="text-green-700 text-sm font-bold flex items-center">
                        <VscTriangleUp />
                        <p className="mx-1">${lastSale?.comparePrice}</p>
                        <span>({lastSale?.percent}%)</span>
                    </div>
                }
            </div>
            <button className="text-[11px] min-w-[85px] font-medium bg-black text-white h-[fit-content] border-[1px] border-black p-1 rounded-sm hover:bg-white hover:text-black" onClick={() => handleView('bid')}>{t("productDetail.allSale")}</button>
            <button className="text-[11px] min-w-[85px] font-medium bg-black text-white h-[fit-content] border-[1px] border-black p-1 rounded-sm hover:bg-white hover:text-black" onClick={() => handleView('ask')}>{t("productDetail.allAsks")}</button>
            <button className="text-[11px] min-w-[85px] font-medium bg-black text-white h-[fit-content] border-[1px] border-black p-1 rounded-sm hover:bg-white hover:text-black" onClick={() => handleView('sale')}>{t("productDetail.allBids")}</button>
        </div>
        {
            toggle && <ProductSizeInfo onToggle={handleToggle} product={product._id} size={currentSize} view={view} />
        }
      </>
    )
}

export default BuySellContainer
