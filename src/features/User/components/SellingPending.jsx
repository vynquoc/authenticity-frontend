import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import portfolioApi from '../../../api/portfolioApi'

const SellingPending = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [orders, setOrders] = useState([])  
    const getAsks = useCallback(async () => {
        try {
            const response = await portfolioApi.getAskingPending(user.id)
            setOrders(response.data.orders)
        } catch (error) {
            
        }
    }, [user.id])
    useEffect(() => {
        getAsks()
    }, [getAsks])

    return (
        <div className="mt-8">
            <table>
                <thead className="border-t-[1px] border-b-[1px]">
                    <tr className="text-left font-medium text-sm">
                        <th className="w-[300px] font-medium text-center">Sản phẩm</th>
                        <th className="w-[150px] font-medium text-center">Mã đơn hàng</th>
                        <th className="w-[150px] font-medium text-center">Ngày bán</th>
                        <th className="w-[150px] font-medium text-center">Giá bán</th>
                        <th className="w-[150px] font-medium text-center">Tình trạng</th>
                    </tr>
                </thead>
               {
                   orders.length !== 0 ?
                   <tbody>
                   {
                       orders.map(order => {
                           return  <tr className="mb-2 border-b-[1px]" key={order.orderId}>
                                           <td className="p-2">
                                               <Link to={`/${order.slug}`} className="flex items-center justify-between">
                                                   <div className="w-[30%] mr-2">
                                                       <img src={order.productImage} alt="test" />
                                                   </div>
                                                   <div className="flex-1">
                                                       <p className="text-xs font-medium line-clamp-2">{order.productName}</p>
                                                       <p className="text-xs border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">US Size {order.productSize}</p>
                                                   </div>
                                               </Link>
                                           </td>
                                           <td className="font-medium text-sm text-center">{order.orderNumber}</td>
                                           <td className="font-medium text-sm text-center">{order.purchaseDate.split('T')[0]}</td>
                                           <td className="font-medium text-sm text-center">${order.purchasePrice}</td>
                                           <td className="font-medium text-sm text-center">{order.status}</td>
                                   </tr>
                       })
                   }
                   </tbody>
                   : <div className="absolute left-1/2 top-1/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
               }
            </table>
        </div>
    )
}

export default SellingPending
