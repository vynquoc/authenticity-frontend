import React, { useEffect, useState } from 'react'
import useModal from '../../../hooks/useModal'
import adminApi from '../../../api/adminApi'

import { MdCheckCircle, MdCancel } from "react-icons/md"
import { BiPencil, BiTrash } from "react-icons/bi"
import { FiPlus, FiSearch } from "react-icons/fi"
import { toast } from 'react-toastify'
//components
import Modal from '../../../components/Modal'

const ManageStaff = () => {
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState('')
    const [staffs, setStaffs] = useState([])
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [info, setInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: '',
    })
    const [editInfo, setEditInfo] = useState({
        name:  selectedStaff?.name,
        username: selectedStaff?.username,
        email:  selectedStaff?.email,
        role: selectedStaff?.role,
        active:  selectedStaff?.active,
    })
    const handleOnChange = (event) => {
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }
    const handleEditOnChange = (event) => {
        setEditInfo({
            ...editInfo,
            [event.target.name]: event.target.value
        })
    }
    const handleDeleteModal = (staff) => {
        setSelectedStaff(staff)
        setModal('delete')
        toggleModal()
    }
    const handleAddModal = () => {
        setModal('add')
        toggleModal()
    }
    const handleEditModal = (staff) => {
        setSelectedStaff(staff)
        setEditInfo(staff)
        setModal('edit')
        toggleModal()
    }

    const handleAddStaff = async () => {
        try {
            const response = await adminApi.addStaff({...info, passwordConfirm: info.password})
            setStaffs([...staffs, response.newUser])
            toast.success('Thêm thành công !')
            toggleModal()
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
        }
    }

    const handleDeleteStaff = async () => {
        try {
            const response = await adminApi.deleteStaff(selectedStaff._id)
            setStaffs(staffs.filter(staff => staff._id !== response.deletedUser._id))
            toast.success('Xóa thành công !')
            toggleModal()
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
        }
    }
    const handleEditStaff = async () => {
        try {
            const response = await adminApi.editStaff(selectedStaff._id, editInfo)
            const updatedStaff = response.updatedUser
            toggleModal()
            setStaffs(staffs.map(staff => (staff._id === updatedStaff._id ?  updatedStaff : staff)))
            toast.success('Cập nhật thành công !')
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
        }
    }
    const getAllStaffs = async () => {
        try {
            const response = await adminApi.getAllStaff()
            setStaffs(response.staffs)
        } catch (error) {
            console.log(error.response)
        }
    }
    
    useEffect(() => {
        getAllStaffs()
    }, [])

    return (
        <div className="flex-1 mt-10 py-4 px-8">
            <h1 className="font-bold text-2xl">Quản lý nhân viên</h1>
            <div className="flex items-center justify-between">
                <div className="flex items-center border-[1px] p-1 border-gray-300 w-1/3">
                    <div className="mr-1">
                        <FiSearch className="font-bold" />
                    </div>
                    <input className="outline-none text-sm w-full" placeholder="Tìm kiếm mã nhân viên, tên, ..." />
                </div>
                <div className="flex justify-end items-center my-4" onClick={handleAddModal}>
                    <div className="flex items-center bg-red-700 p-1 border-2 border-transparent text-white rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-red-700">
                        <FiPlus className="font-semibold mr-2 font-bold text-2xl" />
                        <button className="text-xs  font-semibold">Thêm nhân viên</button>
                    </div>
                </div>
            </div>
            <div>
                <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">Mã nhân viên</th>
                            <th className="w-[150px] text-center">Họ tên</th>
                            <th className="w-[200px] text-center">Vị trí</th>
                            <th className="w-[150px] text-center">Hoạt động</th>
                            <th className="w-[150px] text-center">Ngày tham gia</th>
                            <th className="w-[150px] text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffs.map((staff) => (
                                <tr className="h-[40px] text-sm font-medium" key={staff._id}>
                                    <td className="text-center">{staff.staffCode}</td>
                                    <td className="text-center">{staff.name}</td>
                                    <td className="text-center">{staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}</td>
                                    <td className="text-center">{staff.active ? <MdCheckCircle className="text-green-700 block mx-auto text-xl" /> : <MdCancel className="text-red-700 text-xl" />}</td>
                                    <td className="text-center">{staff.createdAt.split('T')[0]}</td>
                                    <td>
                                    <div className="ml-10 text-base">
                                        <span className="inline-block mr-2 cursor-pointer" onClick={() => handleEditModal(staff)}><BiPencil className="inline-block"/></span>
                                        <span className="inline-block mr-2 cursor-pointer" onClick={() => handleDeleteModal(staff)}><BiTrash className="inline-block"/></span>
                                    </div>
                                    </td>
                                </tr>
                            ))
                        }
                    
                    </tbody>
                </table>
            </div>
            {
                modal === 'add' &&   <Modal show={show} className="bg-gray-300 w-[300px]">
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium">Họ và tên</label>
                                    <input className="text-sm p-1 border-none outline-none" placeholder="Nhập họ và tên" name="name" onChange={handleOnChange}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium">Email</label>
                                    <input className="text-sm p-1 border-none outline-none" placeholder="Nhập email" name="email" onChange={handleOnChange}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium">Tài khoản</label>
                                    <input className="text-sm p-1 border-none outline-none" placeholder="Nhập tài khoản" name="username" onChange={handleOnChange} />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium">Mật khẩu</label>
                                    <input className="text-sm p-1 border-none outline-none" placeholder="Nhập mật khẩu" type="password" name="password" onChange={handleOnChange}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium">Vị trí</label>
                                    <select className="text-sm outline-none py-2 cursor-pointer" name="role" onChange={handleOnChange}>
                                        <option value="" selected>--</option>
                                        <option value="nhân viên kiểm tra">Nhân viên kiểm tra</option>
                                        <option value="nhân viên xử lý">Nhân viên xử lý</option>
                                        <option value="nhân viên hỗ trợ">Nhân viên hỗ trợ</option>
                                    </select>
                                </div>
                                    <div className="flex justify-between">
                                        <button className="border-2 font-semibold text-sm border-black px-4 py-2 bg-white" onClick={toggleModal}>Hủy</button>
                                        <button className="bg-red-700 font-semibold text-sm text-white px-4 py-2" onClick={handleAddStaff}>Thêm</button>
                                    </div>
                              </Modal>}
            {
                modal === 'delete' && <Modal show={show}>
                                    <h1 className="text-center font-semibold">Xóa nhân viên</h1>
                                    <p className="text-sm my-2">Chắc chắn xóa nhân viên <span className="font-semibold">{selectedStaff.name}</span> ?</p>
                                    <div className="flex justify-between">
                                        <button className="border-[1px] font-semibold text-sm border-black px-4 bg-white" onClick={toggleModal}>Hủy</button>
                                        <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={handleDeleteStaff}>Xóa</button>
                                    </div>
                                 </Modal>
            }
             {
                modal === 'edit' &&   <Modal show={show} className="bg-gray-300">
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Họ và tên</label>
                                            <input className="text-sm p-1 border-none outline-none" placeholder="Nhập họ và tên" defaultValue={selectedStaff.name} name="name" onChange={handleEditOnChange}/>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Email</label>
                                            <input className="text-sm p-1 border-none outline-none" placeholder="Nhập email" defaultValue={selectedStaff.email} name="email" onChange={handleEditOnChange}/>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Tài khoản</label>
                                            <input className="text-sm p-1 border-none outline-none" placeholder="Nhập tài khoản" defaultValue={selectedStaff.username} name="username" onChange={handleEditOnChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Vị trí</label>
                                            <select className="text-sm outline-none" name="role" onChange={handleEditOnChange}>
                                                <option value="nhân viên kiểm tra" selected={editInfo.role === "nhân viên kiểm tra"}>Nhân viên kiểm tra</option>
                                                <option value="nhân viên xử lý" selected={editInfo.role === "nhân viên xử lý"}>Nhân viên xử lý</option>
                                                <option value="nhân viên hỗ trợ" selected={editInfo.role === "nhân viên hỗ trợ"}>Nhân viên hỗ trợ</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Trạng thái hoạt động</label>
                                            <select className="text-sm outline-none" name="active" onChange={handleEditOnChange}>
                                                <option value="true" selected={selectedStaff.active}>Đang hoạt động</option>
                                                <option value="false" selected={selectedStaff.active === false}>Không hoạt động</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between">
                                                <button className="border-[1px] font-semibold text-sm border-black px-4 bg-white" onClick={toggleModal}>Hủy</button>
                                                <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={handleEditStaff}>Sửa</button>
                                            </div>
                                     </Modal>
            }
        </div>
    )
}

export default ManageStaff
