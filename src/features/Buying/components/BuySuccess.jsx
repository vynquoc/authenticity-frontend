import React from 'react'
import { FcCheckmark } from "react-icons/fc"
import { Link } from 'react-router-dom'

const BuySuccess = ({orderNumber}) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 p-4 bg-gray-100 z-50">
            <FcCheckmark className="text-9xl mx-auto border-2 rounded-[100%] border-green-600 my-7 ani animate-success-check"/>
            <p className="text-center text-2xl font-bold">Mua Hàng Thành Công</p>
            <div className="text-left text-base font-medium py-4 px-14">
                <p className="mb-2">Mã đơn hàng: <span className="font-bold float-right">{orderNumber}</span></p>
                <p className="text-sm mb-2">Sản phẩm được đảm bảo 100% chính hãng</p>
                <p className="text-xs">Truy cập <span className="font-semibold">Trang chủ &gt; Tài khoản &gt; Mua &gt; Đang xử lý</span><br /> để theo dõi trạng thái đơn hàng</p>
            </div>
            <p className="text-center text-sm">Click <Link to="/" className="text-red-700 underline font-semibold">vào đây</Link> để trở về trang chủ</p>
        </div>
    )
}

export default BuySuccess
