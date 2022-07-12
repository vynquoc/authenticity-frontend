import React from 'react'


const ShippingInfo = ({openModal, handleOpenModal, onShippingChange, shipping, buy}) => {
    return (
        <div className={"absolute top-0 bottom-0 left-0 p-4 bg-gray-100 z-50 " + (openModal ? "" : "hidden")}>
            <h1 className="font-bold text-2xl mb-4">{buy ? 'Thông tin giao hàng' : 'Thông tin lấy hàng'}</h1>
            <input className="w-full border-[1px] p-2 text-sm mb-4" name="phoneNumber" value={shipping.phoneNumber} placeholder="Số điện thoại" onChange={onShippingChange} />
            <input className="w-full border-[1px] p-2 text-sm mb-4" name="province" value={shipping.province} placeholder="Tỉnh/Thành Phố" onChange={onShippingChange}/>
            <input className="w-full border-[1px] p-2 text-sm mb-4" name="district" value={shipping.district} placeholder="Quận/Huyện" onChange={onShippingChange}/>
            <input className="w-full border-[1px] p-2 text-sm mb-4" name="ward" value={shipping.ward} placeholder="Phường/Xã" onChange={onShippingChange}/>
            <input className="w-full border-[1px] p-2 text-sm mb-4" name="address" value={shipping.address} placeholder="Địa chỉ cụ thể (Số nhà, đường)" onChange={onShippingChange}/>
            <div>
                <button className="bg-black text-white font-semibold text-sm py-2 px-7 rounded-full" onClick={handleOpenModal}>Hủy</button>
                <button className="float-right bg-black text-white font-semibold text-sm p-2 rounded-full" onClick={handleOpenModal}>Xác nhận</button>
            </div>
        </div>
    )
}

export default ShippingInfo
