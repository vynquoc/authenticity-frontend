import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BUY_FEE_LV1, BUY_FEE_LV2, BUY_FEE_LV3 } from '../../../constants/buyConstant'
//components
import BuyForm from './BuyForm'
import BidForm from './BidForm'


const BuyContainer = ({lowestAsk, highestBid, size, product}) => {
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
            const percent = level === 1 ? BUY_FEE_LV1 : (level === 2) ?  BUY_FEE_LV2 : BUY_FEE_LV3
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
            <div className="p-4">
                <div className="border-[1px] rounded-full bg-white mb-5">
                    <button
                        className={"w-6/12 py-4 px-4 font-semibold rounded-full " + ( toggleActive === 1 && "bg-red-600 text-white")}
                        onClick={() => handleToggle(1)}>
                        Đấu Giá
                    </button>
                    <button 
                        className={"w-6/12 py-4 px-4 font-semibold rounded-full " + ( toggleActive === 2 && "bg-red-600 text-white")}
                        onClick={() => handleToggle(2)}>
                            Mua Ngay
                    </button>
                </div>
                <BidForm 
                    toggleActive={toggleActive}
                    handleToggle={handleToggle}
                    size={size} product={product}
                    lowestAsk={lowestAsk}
                    highestBid={highestBid}
                    processPercent={processPercent}
                    shipping={shipping}
                    onShippingChange={handleShippingChange}
                    />
                    
                {
                    lowestAsk ? 
                    <BuyForm 
                    lowestAsk={lowestAsk} 
                    toggleActive={toggleActive}
                    size={size} 
                    product={product} 
                    processPercent={processPercent}
                    shipping={shipping}
                    onShippingChange={handleShippingChange}
                    />
                    : <p className={"text-sm font-semibold underline mt-10 text-center " + (toggleActive === 2 ? "" : "hidden")}>SẢN PHẨM HOẶC KÍCH CỠ NÀY CHƯA CÓ GIÁ</p>
                }
            </div>
    )
}

export default BuyContainer
