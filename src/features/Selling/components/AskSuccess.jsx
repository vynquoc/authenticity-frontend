import React from 'react'
import { FcCheckmark } from "react-icons/fc"
import { Link } from 'react-router-dom'

const AskSuccess = ({price, expireDays}) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 p-4 bg-gray-100 z-50">
             <FcCheckmark className="text-9xl mx-auto border-2 rounded-[100%] border-green-600 my-7 ani animate-success-check"/>
             <p className="text-center text-2xl font-bold">Ra Giá Thành Công</p>
             <ul className="text-left text-base font-medium py-4 px-14">
                 <li className="list-disc">Giá của bạn: <span className="font-bold float-right">${price}</span></li>
                 <li className="list-disc">Thời hạn: <span className="font-bold float-right">{expireDays} ngày</span></li>
             </ul>
             <p className="text-center text-sm">Click <Link to="/" className="text-red-700 underline font-semibold">vào đây</Link> để trở về trang chủ</p>
        </div>
    )
}

export default AskSuccess
