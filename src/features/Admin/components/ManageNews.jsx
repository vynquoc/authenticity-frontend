import React, { useEffect, useState } from 'react'
import axios from 'axios'
import adminApi from '../../../api/adminApi'
import newsApi from '../../../api/newsApi'
import { Link } from 'react-router-dom'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { BiPencil, BiTrash } from "react-icons/bi"
import { toast } from 'react-toastify'
import useModal from '../../../hooks/useModal'

import Modal from '../../../components/Modal'
import Spinner from '../../../components/Spinner'

const ManageNews = () => {
    const {show, toggleModal} = useModal()
    const [newses, setNewses] = useState([])
    const [news, setNews] = useState({})
    const [image, setImage] = useState("")
    const [deletedNews, setDeleteNews] = useState({})
    const [isUploading, setIsUploading] = useState(false)

    const handleDeleteModal = (news) => {
        setDeleteNews(news)
        toggleModal()
    }

    const handleChange = (event, editor) => {
        const data = editor.getData()

        setNews({...news, content: data})
    }
    const handleTitleChange = (event) => {
        setNews({...news, title: event.target.value})
    }
    const uploadImage = async (event) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "authenticity")
        let url = ""
        try {
            const response =  await axios.post('https://api.cloudinary.com/v1_1/vydepchai/image/upload', data)
            url = response.data.url
        } catch (error) {
            console.log(error.response)
        }
        return url
    }
    const handleCreate = async () => {
        setIsUploading(true)
        const url = await uploadImage()
        setTimeout(async () => {
            try {
                const response = await adminApi.createNews({...news, thumbnail: url})
                setNewses([...newses, response.news])
                toast.success('Thêm thành công !')
                setIsUploading(false)
            } catch (error) {
                console.log(error.response)
                setIsUploading(false)
            }
        }, 3000)
       
    }

    const handleDeleteNews = async () => {
        try {
            const response = await newsApi.deleteNews(deletedNews.slug)
            const newResult = newses.filter(news => news._id !== response.deletedNews._id)

            setNewses(newResult)
            toast.success('Xóa thành công !')
            toggleModal()
        } catch (error) {
            console.log(error.response)
        }
    }

    const getAllNews = async () => {
        try {
            const response = await newsApi.getAllNews()
            setNewses(response.newses)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getAllNews()
    }, [])

    return (
        <div className="flex-1 mt-10 py-4 px-8">
             <h1 className="font-bold text-2xl mb-6">Quản lý tin tức</h1>
             <div className="mb-10">
                <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">STT</th>
                            <th className="w-[350px] text-center">Tiêu đề</th>
                            <th className="w-[150px] text-center">Ngày tạo</th>
                            <th className="w-[150px] text-center"></th>
                        </tr>
                    </thead>
                    {
                        newses.length !== 0 ?
                        <tbody>
                            {
                                newses.map((news, index) => (
                                    <tr className="border-b-[1px] leading-[80px]" key={news._id}>
                                        <td className="text-center font-medium">{index + 1}</td>
                                        <td className="text-center font-medium text-sm">
                                            <Link to={`/news/${news.slug}`}>
                                            {news.title}
                                            </Link>
                                        </td>
                                        <td className="text-center font-medium text-sm">{news.createdAt.split('T')[0]}</td>
                                        <td className="text-center">
                                            <span className="inline-block mr-2 cursor-pointer"><BiPencil className="inline-block"/></span>
                                            <span className="inline-block mr-2 cursor-pointer" onClick={() => handleDeleteModal(news)} ><BiTrash className="inline-block"/></span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        : <div className="absolute left-1/2 top-1/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
                    }
                </table>
            </div>
             <div className="border-[1px] border-gray-400 p-4">
                 <h1 className="font-bold text-xl">Thêm tin tức</h1>
                 <div className="my-4">
                     <p className="font-semibold">Tiêu đề</p>
                     <input className="border-[1px] w-full p-2 text-sm" placeholder="Nhập tiêu đề" onChange={handleTitleChange} defaultValue={deletedNews.title}/>
                 </div>
                 <div className="my-4">
                     <p className="font-semibold">Thumbnail</p>
                     <input className="text-sm p-1 border-none outline-none" type="file"  accept="image/png, image/gif, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
                 </div>
                <div className="my-4">
                    <p className="font-semibold">Nội dung</p>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onChange={handleChange}
                    
                    />
                </div>
                <button disabled={isUploading} className="block ml-auto bg-red-700 text-white font-semibold px-6 py-3 mt-2 min-w-[95px]" onClick={handleCreate}>{isUploading ? <Spinner borderColor={"border-white border-[3px]"} /> : <p>Thêm</p>}</button>
             </div>
             <Modal show={show} >
                <h1 className="font-semibold mb-4">Chắc chắn xóa ?</h1>
                <div className="flex justify-between">
                        <button className="border-[1px] font-semibold text-sm border-black px-4 bg-white" onClick={toggleModal}>Hủy</button>
                        <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={handleDeleteNews}>Xóa</button>
                </div>
             </Modal>
        </div>
    )
}

export default ManageNews
