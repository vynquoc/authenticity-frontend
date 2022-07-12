import React, { useState } from 'react'
import {HiChevronDown, HiChevronUp} from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const SizeOptions = ({handleChangeSize, currentSize}) => {
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const currentProduct = useSelector(state => state.currentProductDetail.productDetail)
    const asks = useSelector(state => state.currentProductDetail.productDetail?.lowestAsks)
    //CREATE SIZE SET TO SHOW
    let sizeSet = []
    if (currentProduct && asks) {
        let sizes = currentProduct.product.sizes
        for (let i = 0; i < sizes.length; i++) {
            let found = false
            for (let j = 0; j < asks.length; j++) {
                if (sizes[i] === asks[j]._id) {
                    found = true
                    sizeSet.push({
                        sizeName: sizes[i],
                        sizePrice: asks[j].lowestPrice
                    })
                }
            }
           if (!found) {
            sizeSet.push({
                sizeName: sizes[i],
                sizePrice: '--'
            })
           }
        }
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="rounded-md relative mb-3 bg-white">
            <div className="text-sm flex justify-between border-[1px] border-gray-400 p-2 rounded-md cursor-pointer select-none" onClick={handleOpen}>
                <span>Size: </span>
                <span className="font-semibold">
                    US {currentSize}
                    <span>
                        {
                            isOpen ? <HiChevronUp className="inline text-lg"/> : <HiChevronDown className="inline text-lg"/>
                        }
                    </span>
                </span>
            </div>
            <div className={"absolute w-full p-2  z-50 bg-white left-0 top-10 border-[1px] " + (!isOpen && "hidden")}>
                    <div className="flex justify-between text-xs font-semibold">
                        <span>{t("productDetail.chooseSize")} </span>
                        <span>{t("productDetail.sizeChart")}</span>
                    </div>
                    <ul className="mt-2 text-xs max-h-[300px] overflow-auto none">
                        {
                            sizeSet.map((size, index) =>
                            <li 
                                key={index}
                                onClick={() => {
                                    handleChangeSize(size.sizeName)
                                    handleOpen()
                                }}
                                className="flex justify-between border-[1px] border-gray-200 p-1 rounded-sm mt-2 font-medium hover:bg-gray-200 cursor-pointer">
                                <span>US {size.sizeName}</span>
                                <span>$ {size.sizePrice}</span>
                            </li>)
                        }
                    </ul>
            </div>
        </div>
    )
}

export default SizeOptions
