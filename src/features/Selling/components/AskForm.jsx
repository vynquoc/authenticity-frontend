import React, {useRef, useState} from 'react'
import { BiDollar, BiAlarm, BiBuildingHouse, BiPencil } from "react-icons/bi"
import sellingApi from '../../../api/sellingApi'
//components
import AskSuccess from './AskSuccess'
import Spinner from '../../../components/Spinner'

import ShippingInfo from '../../../components/ShippingInfo'
const AskForm = ({toggleActive, handleToggle, highestBid, product, size, processPercent, shipping, onShippingChange}) => {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [price, setPrice] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [processPrice, setProcessPrice] = useState(null)
    const [expireDays, setExpireDays] = useState(7)
    const typingTimeoutRef = useRef(null)
    const [formValid, setFormValid] = useState(false)
  
    const handlePriceChange = (event) => {   
        let priceInput, processPrice, totalInput 
        //CHECK IF INPUT NaN
        if (event.target.value) {
            priceInput = parseFloat(event.target.value)
            processPrice = parseFloat(priceInput * processPercent / 100)
            totalInput = priceInput - processPrice
        }
        setPrice(priceInput)
        setFormValid(true)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            if (event.target.value <= highestBid?.price && price !== 0 && highestBid) {
                setPrice(0)
                handleToggle(2)
            } else {
                setTotalPrice(totalInput)
                setProcessPrice(processPrice)
                setFormValid(true)
            }
        }, 800);
        if (event.target.value > 0) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }

   

    const handleExpireDayChange = (event) => {
        setExpireDays(parseInt(event.target.value))
    }
    const handleAskSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await sellingApi.placeAsk(shipping, product, size, price, totalPrice, expireDays)
            setIsSuccess(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleOpenModal = (event) => {
        event.preventDefault()
        setOpenModal(!openModal)
    }
    return (
       isSuccess ? <AskSuccess price={price} expireDays={expireDays}/>
       :
       <form className={toggleActive === 1 ? "" : "hidden"} onSubmit={handleAskSubmit}>
            <div className="bg-white p-4 rounded-md" >
                <div className="flex items-center justify-center my-4 mb-3">
                    <BiDollar className="text-2xl" />
                    <input placeholder="Nhập giá" type="number" className="p-2 border-[1px] outline-none" value={price} onChange={handlePriceChange}/>          
                </div>
                <div className="flex justify-between text-sm mb-3">
                        <p>Phí dịch vụ ({processPercent}%)</p>
                        <span>- $ {processPrice ? processPrice : '--'}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                        <p>Phí gửi hàng</p>
                        <span>Free</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                        <p>Tổng</p>
                        <span>$ {totalPrice ? totalPrice : '--'}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <BiAlarm  className="text-gray-300 text-xl mr-2"/>
                        <p className="text-sm">Ngày hết hạn</p>
                    </div>
                    <select className="text-sm outline-none cursor-pointer" onChange={handleExpireDayChange}>
                        <option value="7" selected>7 ngày</option>
                        <option value="14">14 ngày</option>
                        <option value="30">30 ngày</option>
                    </select>
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
            <button type="submit" disabled={!formValid || typeof totalPrice === "undefined"} className={"text-white w-[120px] p-3 font-semibold text-sm rounded-full float-right mt-5 " + (formValid ? 'bg-black' : 'bg-gray-300 cursor-default')}> {loading ? <Spinner /> : 'Xác nhận'} </button>
        </form>
    )
}

export default AskForm
