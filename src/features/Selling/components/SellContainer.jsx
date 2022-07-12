import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {SELL_FEE_LV1, SELL_FEE_LV2, SELL_FEE_LV3} from "../../../constants/sellConstant"
//components
import AskForm from './AskForm'
import SellForm from './SellForm'

const SellContainer = ({lowestAsk, highestBid, product, size}) => {
    const user = useSelector(state => state.userLogin?.userInfo)
    const [toggleActive, setToggleActive] = useState(1)
    const [processPercent, setProcessPercent] = useState(0)
    const [shipping, setShipping] = useState({
        phoneNumber:'',
        province:'',
        district:'',
        ward:'',
        address:''
    })
    useEffect(() => {
        if (user) {
            const {shippingInfo, level} = user
            if (shippingInfo) {
                setShipping({
                    phoneNumber: shippingInfo.phoneNumber,
                    province: shippingInfo.province,
                    district: shippingInfo.district,
                    ward: shippingInfo.ward,
                    address: shippingInfo.address
                })
            }
            const percent = level === 1 ? SELL_FEE_LV1 : (level === 2) ?  SELL_FEE_LV2 : SELL_FEE_LV3
            setProcessPercent(percent)
        }
    }, [user])
    const handleShippingChange = (event) => {
        setShipping({
            ...shipping,
            [event.target.name]: event.target.value
        })
    }
    const handleToggle = (index) => {
        setToggleActive(index)
    }

    return (
        <div>
            <div className="p-4">
                <div className="border-[1px] rounded-full bg-white mb-5">
                    <button
                        className={"w-6/12 py-4 px-4 font-semibold rounded-full " + ( toggleActive === 1 && "bg-red-600 text-white")}
                        onClick={() => handleToggle(1)}>
                        Ra Giá
                    </button>
                    <button 
                        className={"w-6/12 py-4 px-4 font-semibold rounded-full " + ( toggleActive === 2 && "bg-red-600 text-white")}
                        onClick={() => handleToggle(2)}>
                            Bán Ngay
                    </button>
                </div>
                {/* ASK FORM START */}
                <AskForm
                 highestBid={highestBid}
                 product={product} size={size}  
                 toggleActive={toggleActive} 
                 handleToggle={handleToggle}
                 processPercent={processPercent}
                 shipping={shipping}
                 onShippingChange={handleShippingChange}
                 />
                {/* ASK FORM END */}
                {/* SELL NOW START */}
                {
                    highestBid ?
                    <SellForm 
                    product={product}
                    size={size}
                    highestBid={highestBid}
                    processPercent={processPercent}
                    shipping={shipping}
                    toggleActive={toggleActive}
                    onShippingChange={handleShippingChange}
                    />
                    : <p className={"text-sm font-semibold underline mt-10 " + (toggleActive === 2 ? "" : "hidden")}>SẢN PHẨM HOẶC KÍCH CỠ NÀY CHƯA CÓ ĐẤU GIÁ</p>
                }
                {/* SELL NOW END */}
            </div>
        </div>
    )
}

export default SellContainer
