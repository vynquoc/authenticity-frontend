import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiPencil, BiTrash } from "react-icons/bi"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useModal from '../../../hooks/useModal'
import portfolioApi from '../../../api/portfolioApi'
import sellingApi from '../../../api/sellingApi'
//components
import Modal from '../../../components/Modal'

const AskList = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [deletedAsk, setdeletedAsk] = useState('')
    const [asks, setAsks] = useState([])
    const {show, toggleModal} = useModal()
    const getAsks = async () => {
        try {
            const response = await portfolioApi.getAsks(user.id)
            console.log(response.data.asks)
            setAsks(response.data.asks)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getAsks()
    }, [])

    const handleDeleteModal = (ask) => {
        setdeletedAsk(ask)
        toggleModal()
    }

    const handleDeleteAsk = async (id) => {
        try {
            await sellingApi.deleteAsk(id)
            const newAsks = asks.filter(ask => ask.askInfo.askId !== deletedAsk.askInfo.askId)
            toast.success('Xoá thành công !!')
            setAsks(newAsks)
            toggleModal()
        } catch (error) {
            
        }
    }
    return (
        <div className="mt-8">
        <table>
            <thead className="border-t-[1px] border-b-[1px]">
                <tr className="text-left font-semibold text-sm ">
                    <th className="w-[250px] text-center">Sản phẩm</th>
                    <th className="w-[150px] text-center">Giá ra</th>
                    <th className="w-[150px] text-center">Giá trả cao nhất</th>
                    <th className="w-[150px] text-center">Giá bán thấp nhất</th>
                    <th className="w-[150px] text-center">Hết hạn</th>
             
                </tr>
            </thead>
            {
                asks.length !== 0 ?
                <tbody>
                {
                    asks.map(ask => {
                    return  <tr className="mb-2 border-b-[1px]" key={ask.askInfo.askId}>
                        <td className="p-2">
                            <Link to={`/${ask.askInfo.slug}`} className="flex items-center justify-between">
                                <div className="w-[30%] mr-2">
                                    <img src={ask.askInfo.productImage} alt="test" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-medium line-clamp-2">{ask.askInfo.productName}</p>
                                    <p className="text-xs border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size {ask.askInfo.productSize}</p>
                                </div>
                            </Link>
                        </td>
                        <td className="font-medium text-center">${ask.askInfo.price}</td>
                        <td className="font-medium text-center">${ask.highestBid ? ask.highestBid : '--'}</td>
                        <td className="font-medium text-center">${ask.lowestAsk ? ask.lowestAsk : '--'}</td>
                        <td className="font-medium text-center">{ask.askInfo.expireDate.split('T')[0]}</td>
                        <td>
                        <Link to={`/buy/${ask.askInfo.slug}?size=${ask.askInfo.productSize}`} className="inline-block mr-2 cursor-pointer"><BiPencil className="inline-block"/></Link>
                            <span className="inline-block mr-2 cursor-pointer" onClick={() => handleDeleteModal(ask)}><BiTrash className="inline-block"/></span>
                        </td>
                    </tr>
                    })
                }
                </tbody>
                :
                <div className="absolute left-1/2 top-1/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
            }
        </table>
        <Modal show={show} toggleModal={toggleModal}>
                <div>
                    <div className="w-[100px] mx-auto">
                        <img src={deletedAsk.askInfo?.productImage} alt="product" />
                    </div>
                    <p className="text-xs font-semibold text-center">{deletedAsk.askInfo?.productName}</p>
                    <p className="text-xs mx-auto my-1 border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size: {deletedAsk.askInfo?.productSize}</p>
                </div>
                <p className="my-2 text-sm font-semibold text-center">Bạn có chắc chắn xóa ?</p>
                <div className="flex justify-evenly">
                    <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={handleDeleteModal}>Hủy</button>
                    <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={() => handleDeleteAsk(deletedAsk.askInfo.askId)}>Xóa</button>
                </div>
        </Modal>
    </div>
    )
}

export default AskList
