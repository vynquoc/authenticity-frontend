import React from 'react'
import { FcCheckmark } from "react-icons/fc"
import { Link } from 'react-router-dom'

const SellSuccess = ({orderNumber}) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 p-4 bg-gray-100 z-50">
            <FcCheckmark className="text-9xl mx-auto border-2 rounded-[100%] border-green-600 my-7 ani animate-success-check"/>
            <p className="text-center text-2xl font-bold">Bán Hàng Thành Công</p>
            <div className="text-left text-base font-medium py-4 px-14">
                <p className="mb-2">Mã đơn hàng: <span className="font-bold float-right">{orderNumber}</span></p>
                <ul className="text-xs mb-1">
                    <li className="list-disc">Vui lòng kiểm tra email để lấy phiếu gửi hàng</li>
                    <li className="list-disc">Gửi sản phẩm đến Authenticity trong 3 ngày để tiến hành kiểm tra</li>
                    <li className="list-disc">Bạn sẽ được thanh toán khi kiểm tra chính hãng thành công</li>
                </ul>
                <p className="text-xs">Truy cập <span className="font-semibold">Trang chủ &gt; Tài khoản &gt; Bán &gt; Đang xử lý</span><br /> để theo dõi trạng thái đơn hàng</p>
            </div>
            <p className="text-center text-sm">Click <Link to="/" className="text-red-700 underline font-semibold">vào đây</Link> để trở về trang chủ</p>
        </div>
    )
}

export default SellSuccess
