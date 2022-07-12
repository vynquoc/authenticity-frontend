import React, { useState } from 'react'
import { BiDollar, BiBuildingHouse, BiPencil } from "react-icons/bi"
import sellingApi from '../../../api/sellingApi'
//components
import ShippingInfo from '../../../components/ShippingInfo'
import SellSuccess from './SellSuccess'
import Spinner from '../../../components/Spinner'


const SellForm = ({highestBid, product, size, toggleActive, processPercent, shipping, onShippingChange}) => {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')
    const price = highestBid?.price
    const totalPrice =  price - price * processPercent / 100 
    
    const handleSellSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await sellingApi.createOrderBySell(highestBid, product, size, price, totalPrice, shipping)
            setIsSuccess(true)
            setLoading(false)
            setOrderNumber(response.order.orderNumber)
            console.log(response)
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }

    }

    const handleOpenModal = (event) => {
        event.preventDefault()
        setOpenModal(!openModal)
    }
    return (
        isSuccess ? <SellSuccess orderNumber={orderNumber}/>
        :
        <form className={toggleActive === 2 ? "" : "hidden"} onSubmit={handleSellSubmit}>
                    <div className="bg-white p-4 rounded-md" >
                        <div className="flex items-center justify-center my-4 mb-3">
                            <BiDollar className="text-2xl" />
                            <input value={highestBid ? highestBid.price : '--'} disabled type="number" className="p-2 border-[1px] outline-none" />
                        </div>
                        <p className="text-center text-xs text-gray-400 mb-2">Bạn đang bán với giá được trả cao nhất</p>
                        <div className="flex justify-between text-sm mb-3">
                                <p>Phí dịch vụ ({processPercent}%)</p>
                                <span>- ${highestBid ? highestBid.price * processPercent / 100 : '--'}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                                <p>Phí gửi hàng</p>
                                <span>Free</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                                <p>Tổng</p>
                                <span> $ {totalPrice ? totalPrice : '--'}</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <BiBuildingHouse  className="text-gray-300 text-xl mr-2"/>
                        <p className="text-sm">
                            {shipping.address ? shipping.address : '--'}
                        </p>
                    </div>
                    <BiPencil className="cursor-pointer" onClick={handleOpenModal} />
                </div>
                    </div>
                    <ShippingInfo shipping={shipping} openModal={openModal} handleOpenModal={handleOpenModal} onShippingChange={onShippingChange} />
                    <button type="submit" disabled={!shipping.address} className={"text-white w-[120px] p-3 font-semibold text-sm rounded-full float-right mt-5 " + (shipping.address ? 'bg-black' : 'bg-gray-300 cursor-default')}> {loading ? <Spinner /> : 'Xác nhận'} </button>
        </form>
    )
}

export default SellForm
