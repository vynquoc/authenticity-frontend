import React, { useState } from 'react'
import { BiDollar, BiAlarm, BiBuildingHouse, BiPencil } from "react-icons/bi"
import buyingApi from '../../../api/buyingApi'
//components
import ShippingInfo from '../../../components/ShippingInfo'
import BidSuccess from './BidSuccess'
import Spinner from '../../../components/Spinner'

const BidForm = ({toggleActive, handleToggle, product, size, lowestAsk, highestBid, processPercent, shipping, onShippingChange}) => {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [price, setPrice] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [processPrice, setProcessPrice] = useState(null)
    const [expireDays, setExpireDays] = useState(7)
    const [formValid, setFormValid] = useState(false)

    const handlePriceChange = (event) => {   
        let priceInput, processPrice, totalInput 
        //CHECK IF INPUT NaN
        if (event.target.value) {
            priceInput = parseFloat(event.target.value)
            processPrice = parseFloat(priceInput * processPercent / 100)
            totalInput = processPrice + priceInput
        }
        //CHECK IF BID PRICE EQUAL OR GREATER THAN ASK PRICE
        if (event.target.value >= lowestAsk?.price) {
            setPrice(0)
            handleToggle(2)
        } else {
            setPrice(priceInput)
            setTotalPrice(totalInput)
            setProcessPrice(processPrice)
        }
        if (event.target.value > 0) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }
    const handleExpireDayChange = (event) => {
        setExpireDays(parseInt(event.target.value))
    }

    const handleBidSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        try {
            const response = await buyingApi.placeBid(shipping, product, size, price, totalPrice, expireDays)
            console.log(response)
            setLoading(false)
            setIsSuccess(true)
        } catch (error) {
            setLoading(false)
            console.log(error.response)
        }
    }
    //HANDLE SHIPPING INFO MODAL
    const handleOpenModal = (event) => {
        event.preventDefault()
        setOpenModal(!openModal)
    }

    return (
        
            isSuccess ? <BidSuccess price={price} expireDays={expireDays}/>
            :
                <div>
                    <form className={toggleActive === 1 ? "" : "hidden"} onSubmit={handleBidSubmit}>
                    <div className="bg-white p-4 rounded-md" >
                        <div className="flex items-center justify-center my-4 mb-3">
                            <BiDollar className="text-2xl" />
                            <input placeholder="Nh???p gi??" type="number" className="p-2 border-[1px] outline-none" value={price} onChange={handlePriceChange}/>
                        </div>
                        {price < highestBid?.price || price === undefined ?
                            <p className="text-center text-xs mb-2 text-gray-500">Gi?? c???a b???n ch??a ph???i l?? gi?? cao nh???t</p>
                            :
                            <p className="text-center text-xs mb-2 text-gray-500">Gi?? c???a b???n l?? gi?? cao nh???t</p>
                        }
                        <div className="flex justify-between text-sm mb-3">
                                <p>Ph?? d???ch v??? ({processPercent}%)</p>
                                <span>+ ${processPrice ? processPrice : '--'}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                                <p>Ph?? g???i h??ng</p>
                                <span>Free</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                                <p>T???ng</p>
                                <span>$ {totalPrice ? totalPrice : '--'}</span>
                        </div>
                        <hr className="mb-2"/>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <BiAlarm  className="text-gray-300 text-xl mr-2"/>
                                <p className="text-sm">Ng??y h???t h???n</p>
                            </div>
                            <select className="text-sm outline-none cursor-pointer" onChange={handleExpireDayChange}>
                                <option value="7" selected>7 ng??y</option>
                                <option value="14">14 ng??y</option>
                                <option value="30">30 ng??y</option>
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
                    <ShippingInfo buy shipping={shipping} openModal={openModal} handleOpenModal={handleOpenModal} onShippingChange={onShippingChange}/>
                    <button type="submit" disabled={!formValid} className={"text-white w-[120px] p-3 font-semibold text-sm rounded-full float-right mt-5 " + (formValid ? 'bg-black' : 'bg-gray-300 cursor-default')}> {loading ? <Spinner /> : 'X??c nh???n'} </button>
                    </form>
                </div>
        
    )
}

export default BidForm
