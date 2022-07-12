import React, { useState } from 'react'
import authApi from '../../../api/authApi'
import { toast } from 'react-toastify'
//components

const UserInfo = ({user}) => {
    const [userInfo, setUserInfo] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        shoeSize: user.shoeSize
    })
    const [editModal, setEditModal] = useState(false)

    const handleOpenModal = () => {
        setEditModal(!editModal)
    }
    const handleInfoChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async () => {
        try {
            const response = await authApi.updateUser(user.id, userInfo)
            setUserInfo(response.updatedUser)
            toast.success('Cập nhật thành công')
            setEditModal(false)
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại")
        }
        
    }
    return (
        <div className="mt-10 py-4 px-8 flex-1">
            <div className="flex justify-between mb-3">
                <p className="font-semibold text-lg">Thông tin cá nhân</p>
                <button className="text-sm font-semibold border-[1px] border-black px-2" onClick={handleOpenModal}>Chỉnh sửa</button>
            </div>
            <hr />
            <div  className="flex flex-wrap">
                <div className="w-1/2 my-5">
                    <p className="font-semibold">Tên</p>
                    <p className="text-sm font-medium">{user.name}</p>
                </div>
                <div className="w-1/2 my-5">
                    <p className="font-semibold">Tên tài khoản</p>
                    <p className="text-sm font-medium">{user.username}</p>
                </div>
                <div className="w-1/2 my-5">
                    <p className="font-semibold">Email</p>
                    <p className="text-sm font-medium">{user.email}</p>
                </div>
                <div className="w-1/2 my-5">
                    <p className="font-semibold">Cấp độ</p>
                    <p className="text-sm font-medium">Cấp độ {user.level}</p>
                </div>
                <div className="w-1/2 my-5">
                    <p className="font-semibold">Size giày</p>
                    <p className="text-sm font-medium">{user.shoeSize ? user.shoeSize : '--'}</p>
                </div>
            </div>
            <div className={"absolute z-[52] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-3 bg-gray-200 w-[400px] " + (editModal ? "" : "hidden")}>
                <p className="mb-5 font-semibold">Chỉnh sửa thông tin</p>
                <div className="mb-4">
                    <p className="text-sm font-semibold">Họ và tên</p>
                    <input value={userInfo.name} name="name" className="w-full text-sm p-1" onChange={handleInfoChange} />
                </div>
                <div className="mb-4">
                    <p className="text-sm font-semibold">Tài khoản</p>
                    <input value={userInfo.username} name="username" className="w-full text-sm p-1" onChange={handleInfoChange} />
                </div>
                <div className="mb-4">
                    <p className="text-sm font-semibold">Email</p>
                    <input value={userInfo.email} name="email" className="w-full text-sm p-1" onChange={handleInfoChange} />
                </div>
                <div className="mb-4">
                <p className="text-sm font-semibold">Size giày</p>
                    <select value={userInfo.size} name="shoeSize" className="w-full py-1" onChange={handleInfoChange}>
                        <option value="">--</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button className="text-xs font-semibold bg-white w-[80px] border-[1px] border-black py-1" onClick={handleOpenModal}>Hủy</button>
                    <button className="text-xs font-semibold bg-black text-white w-[80px] py-1" onClick={handleSubmit}>Cập nhật</button>
                </div>
            </div>
            <div className={"absolute top-0 right-0 left-0 bottom-0 z-[51] opacity-30 bg-black " + (editModal ? '' : "hidden")}></div>
        </div>
    )
}

export default UserInfo
