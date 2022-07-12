import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiPencil, BiTrash } from "react-icons/bi"
import { useSelector } from 'react-redux'
import portfolioApi from '../../../api/portfolioApi'
import buyingApi from '../../../api/buyingApi'
import { toast } from 'react-toastify'
import useModal from '../../../hooks/useModal'
//components
import Modal from '../../../components/Modal'

const BidList = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [deletedBid, setdeletedBid] = useState('')
    const [bids, setBids] = useState([])
    const {show, toggleModal} = useModal()

    const getBids = async () => {
        try {
            const response = await portfolioApi.getBids(user.id)
            console.log(response)
            setBids(response.data.bids)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getBids()
    }, [])

    const handleDeleteModal = (bid) => {
        setdeletedBid(bid)
        toggleModal()
    }

    const handleDeleteBid = async (id) => {
        try {
            await buyingApi.deleteBid(id)
            const newBids = bids.filter(bid => bid.bidInfo.bidId !== deletedBid.bidInfo.bidId)
            toast.success('Xoá thành công !!')
            setBids(newBids)
            toggleModal()
        } catch (error) {
            
        }
    }
    return (
        <div className="mt-8  w-full">
        <table>
            <thead className="border-t-[1px] border-b-[1px]">
                <tr className="text-left font-normal text-sm">
                    <th className="w-[250px] text-center">Sản phẩm</th>
                    <th className="w-[150px] text-center">Giá trả</th>
                    <th className="w-[150px] text-center">Giá trả cao nhất</th>
                    <th className="w-[150px] text-center">Giá bán thấp nhất</th>
                    <th className="w-[150px] text-center">Hết hạn</th>
                </tr>
            </thead>
           {
               bids.length !== 0 ? 
               <tbody>
               {
                   bids.map(bid => {
                   return  <tr className="mb-2 border-b-[1px] w-full" key={bid.bidInfo.bidId}>
                                <td className="p-2">
                                    <Link to={`/${bid.bidInfo.slug}`} className="flex items-center justify-between">
                                        <div className="w-[30%] mr-3">
                                            <img src={bid.bidInfo.productImage} className="w-full" alt="product" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium line-clamp-2">{bid.bidInfo.productName}</p>
                                            <p className="text-xs border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size {bid.bidInfo.productSize}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="font-medium text-center">${bid.bidInfo.price}</td>
                                <td className="font-medium text-center">${bid.highestBid ? bid.highestBid : '--'}</td>
                                <td className="font-medium text-center">${bid.lowestAsk ? bid.lowestAsk : '--'}</td>
                                <td className="font-medium text-center">{bid.bidInfo.expireDate.split('T')[0]}</td>
                                <td>
                                    <Link to={`/buy/${bid.bidInfo.slug}?size=${bid.bidInfo.productSize}`} className="inline-block mr-2 cursor-pointer"><BiPencil className="inline-block"/></Link>
                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => handleDeleteModal(bid)}><BiTrash className="inline-block"/></span>
                                </td>
                        </tr>
                   })
               }
           </tbody>
           :
           <div className="absolute left-1/2 top-1/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
           }
            </table>
            <Modal show={show}>
                <div>
                    <div className="w-[100px] mx-auto">
                        <img src={deletedBid.bidInfo?.productImage} alt="product" />
                    </div>
                    <p className="text-xs font-semibold">{deletedBid.bidInfo?.productName}</p>
                    <p className="text-xs mx-auto my-1 border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size: {deletedBid.bidInfo?.productSize}</p>
                </div>
                <p className="my-2 text-sm font-semibold text-center">Bạn có chắc chắn xóa ?</p>
                <div className="flex justify-between">
                    <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={handleDeleteModal}>Hủy</button>
                    <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={() => handleDeleteBid(deletedBid.bidInfo?.bidId)}>Xóa</button>
                </div>
            </Modal>
          </div>
    )
}

export default BidList
