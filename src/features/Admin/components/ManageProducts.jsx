import React, { memo, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import useModal from '../../../hooks/useModal'
import { FiPlus, FiSearch } from "react-icons/fi"
import { BiPencil, BiTrash } from "react-icons/bi"

import adminApi from '../../../api/adminApi'

import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
//components
import Modal from '../../../components/Modal'

const sneakerSizes = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]
const streetwearSizes = ['xs', 's', 'm', 'l', 'xl']

const ManageProducts = () => {
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState("")
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    const [image, setImage] = useState("")
    const [keyword, setKeyword] = useState('')
    const typingTimeOutRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({
        name: "",
        styleId: "",
        colorway: "",
        releaseDate: "",
        category: "",
        brand: "",
        retailPrice: "",
        year: "",
        sizes: [],
        images: {
            imageUrl: "",
            smallImageUrl: ""
        },
        tags: [],
        description: ""
    })
    const [editProduct, setEditProduct] = useState({
        name: "",
        styleId: "",
        colorway: "",
        releaseDate: "",
        category: "",
        brand: "",
        retailPrice: "",
        year: "",
        sizes: [],
        images: {
            imageUrl: "",
            smallImageUrl: ""
        },
        tags: [],
        description: ""
    })
    //handle OPEN MODAL
    const handleAddModal = () => {
        setModal('add')
        toggleModal()
    }

    const handleDeleteModal = (product) => {
        setSelectedProduct(product)
        setModal('delete')
        toggleModal()
    }

    const handleEditModal = (product) => {
        setEditProduct({
            ...product,
            category: categories.filter(cate => cate.name === product.category.name)[0]._id,
            brand: brands.filter(brand=> brand.name === product.brand.name)[0]._id
        })
        setModal('edit')
        toggleModal()
    }
   
    //handle CHANGE
    const handleOnChange = (event) => {
        if (event.target.name === 'tags') {
            const tags = event.target.value.split(",")
            setProduct({
                ...product,
                tags: tags
            })
        } else if (event.target.name === 'sizes') {
            const sizes = event.target.value.split(",")
            setProduct({
                ...product,
                sizes: sizes
            })
        } else {
            setProduct({
                ...product,
                [event.target.name]: event.target.value
            })
        }
       
    }

    const handleCheckBoxChange = (event) => {
        let newArray = []
        if (product.sizes.includes(event.target.value)) {
            newArray = product.sizes.filter(size => size !== event.target.value)
        } else {
            newArray = [...product.sizes, event.target.value]
        }
        setProduct({
            ...product,
            sizes: newArray
        })
    }

    const handleEditChange = (event) => {
        if (event.target.name === 'tags') {
            const tags = event.target.value.split(",")
            setEditProduct({
                ...editProduct,
                tags: tags
            })
        } else if (event.target.name === 'sizes') {
            const sizes = event.target.value.split(",")
            setEditProduct({
                ...editProduct,
                sizes: sizes
            })
        } else {
            setEditProduct({
                ...editProduct,
                [event.target.name]: event.target.value
            })
        }
       
    }
    const handleEditCheckBoxChange = (event) => {
        let newArray = []
        if (editProduct.sizes.includes(event.target.value)) {
            newArray = editProduct.sizes.filter(size => size !== event.target.value)
        } else {
            newArray = [...editProduct.sizes, event.target.value]
        }
        setEditProduct({
            ...editProduct,
            sizes: newArray
        })
    }
    //CALL API
    const uploadImage = async (event) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "authenticity")
        let url = ""
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/vydepchai/image/upload', data)
            url = response.data.url
        } catch (error) {
            console.log(error.response)
        }
        return url
    }
    const getCategoriesAndBrands = async () => {
        try {
            const response = await adminApi.getCategoriesAndBrands()
            setCategories(response.categories)
            setBrands(response.brands)
        } catch (error) {
            console.log(error.response)
        }
    }
   
    const handleAddProduct = async () => {
       const url = await uploadImage()
        try {
            const response = await adminApi.addProduct({...product, images: {
                imageUrl: url,
                smallImageUrl: url
            }})
            toggleModal()
            toast.success('Thêm sản phẩm thành công !')
        } catch (error) {
            console.log(error.response)
        }

    }
    const handleDeleteProduct = async () => {
        try {
            const response = await adminApi.deleteProduct(selectedProduct._id)
            toggleModal()
            toast.success('Xoá sản phẩm thành công !')
        } catch (error) {
            console.log(error.response)      
        }
    }

    const handleEditProduct = async () => {
        uploadImage()
        try {
            const response = await adminApi.editProduct(editProduct._id, editProduct)
            toast.success('Cập nhật sản phẩm thành công !')
            toggleModal()
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleKeywordChange = (event) => { 
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        const kw = event.target.value.trim().toLowerCase()
        typingTimeOutRef.current = setTimeout(() => {
            setKeyword(kw)
        }, 500);
    }
    const searchProducts = async () => {
        setLoading(true)
        try {
            const response = await adminApi.getAllProducts(keyword)          
            setProducts(response.products)
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            setLoading(false)
        }
    }
    useEffect(() => {
        getCategoriesAndBrands()
    }, [])

    useEffect(() => {
       
         searchProducts()
        
     }, [keyword])

 

    return (
        <div className="mt-10 py-4 px-8 flex-1">
             <h1 className="font-bold text-2xl">Quản lý sản phẩm</h1>
            <div className="flex items-center justify-between">
                <div className="flex items-center border-[1px] p-1 border-gray-300 w-1/3">
                    <div className="mr-1">
                        <FiSearch className="font-bold" />
                    </div>
                    <input className="outline-none text-sm w-full" placeholder="Tìm kiếm mã sản phẩm, tên, ..." onChange={handleKeywordChange}/>
                </div>
                <div className="flex justify-end items-center my-4">
                    <div className="flex items-center bg-red-700 p-1 border-2 border-transparent text-white rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-red-700">
                        <FiPlus className="font-semibold mr-2 font-bold text-2xl" />
                        <button className="text-xs font-semibold" onClick={handleAddModal}>Thêm sản phẩm</button>
                    </div>
                </div>
            </div>
            <div>
                <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px]">Mã sản phẩm</th>
                            <th className="w-[150px]">Ảnh sản phẩm</th>
                            <th className="w-[300px]">Tên sản phẩm</th>
                            <th className="w-[150px]">Danh mục</th>
                            <th className="w-[150px]">Thương hiệu</th>
                            <th className="w-[150px]"></th>
                        </tr>
                    </thead>
                    {
               !loading ? 
                    <tbody>
                        {
                            products.map(product => {
                            return      <tr className="mb-2 border-b-[1px]" key={product._id}>
                                                <td className="p-2">
                                                    <p className="text-xs font-medium">{product._id.toString().slice(-10).toUpperCase()}</p>
                                                </td>
                                                <td>
                                                    <img className="w-[50%]" src={product.images.smallImageUrl} />
                                                </td>
                                                <td>
                                                    <p className="text-xs font-medium">{product.name}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs uppercase font-medium">{product.category?.name}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs uppercase font-medium">{product.brand?.name}</p>
                                                </td>
                                                <td>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => handleEditModal(product)}><BiPencil className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => handleDeleteModal(product)}><BiTrash className="inline-block"/></span>
                                                </td>
                                        </tr>
                            })
                        }
                    </tbody>
                :
                <tbody>
                    <tr>
                        <td className="px-2"><Skeleton /></td>
                        <td className="px-2"><Skeleton height={40} /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                    </tr>
                    <tr>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton height={40} /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                    </tr>
                    <tr>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton height={40} /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                    </tr>
                    <tr>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton height={40} /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                    </tr>
                    <tr>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton height={40} /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                        <td className="px-2"><Skeleton  /></td>
                    </tr>
                </tbody>
                   
           }
           {
               products.length === 0 && !loading &&  <div className="absolute left-1/2 top-2/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
           }
                </table>
            </div>
            {/* ADD FORM START */}
           {
               modal === 'add' &&  <Modal show={show} className="bg-gray-200 rounded-md overflow-y-scroll max-h-[500px]">
                                        <h1 className="text-center font-semibold text-lg mb-2">Thêm sản phẩm</h1>
                                        <div className="flex flex-wrap justify-around">
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Tên sản phẩm</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md"  name="name" onChange={handleOnChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Mẫu</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md"  name="styleId"  onChange={handleOnChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Màu sắc</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md"  name="colorway"  onChange={handleOnChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Ngày ra mắt</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" name="releaseDate"  onChange={handleOnChange}/>
                                            </div>
                                            
                                            <div className="w-[40%] mb-4 flex items-center">
                                                <div className="flex flex-col mb-4 w-full">
                                                        <label className="text-sm font-medium">Danh mục</label>
                                                        <select className="text-sm outline-none rounded-md p-1" name="category"  onChange={handleOnChange}>
                                                            <option value="" selected>--</option>
                                                            {
                                                                categories.map(category => (
                                                                    <option key={category._id} value={category._id}>{category.name.toUpperCase()}</option>
                                                                ))
                                                            }
                                                        </select>
                                                </div>
                                                <button className="ml-2 bg-red-700 text-white"><FiPlus /></button>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Thương hiệu</label>
                                                <select className="text-sm outline-none rounded-md p-1" name="brand"  onChange={handleOnChange}>
                                                    <option value="" selected>--</option>
                                                   {
                                                       brands.map(brand => (
                                                           <option key={brand._id} value={brand._id}>{brand.name.toUpperCase()}</option>
                                                       ))
                                                   }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Giá niêm yết</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" name="retailPrice" onChange={handleOnChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Năm</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" name="year" onChange={handleOnChange}/>
                                            </div>
                                            <div className=" mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Kích cỡ</label>
                                                <div className="flex flex-wrap">
                                                {
                                                        product.category === '614a451f9ce296d085b576e7' && product.category ? sneakerSizes.map(size => (
                                                            <div className="flex flex-col justify-center items-center mr-2 mb-2">
                                                                <label className="text-xs font-medium">{size}</label>
                                                                <input className="" value={size} type="checkbox" name="size" onChange={handleCheckBoxChange}/>
                                                            </div>
                                                        )) : 
                                                        null
                                            
                                                }
                                                {
                                                    product.category === '614cb699642efb6914b4209d' && product.category ? 
                                                    streetwearSizes.map(size => (
                                                        <div className="flex flex-col justify-center items-center mr-2 mb-2">
                                                            <label className="text-xs font-medium uppercase">{size}</label>
                                                            <input className="" value={size} type="checkbox" name="size" onChange={handleCheckBoxChange}/>
                                                        </div> )) : null
                                                }
                                                </div>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Ảnh sản phẩm</label>
                                                <input className="text-sm p-1 border-none outline-none" type="file"  accept="image/png, image/gif, image/jpeg" onChange={(e) => setImage(e.target.files[0])} name="name"/>
                                            </div>
                                          
                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm font-medium">Tags</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" name="tags"  onChange={handleOnChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm font-medium">Mô tả</label>
                                                <textarea className="text-sm p-1 border-none outline-none rounded-md" rows="5" cols="20" name="description" onChange={handleOnChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <button className="border-[1px] font-semibold text-sm border-black px-4 bg-white" onClick={toggleModal}>Hủy</button>
                                            <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={handleAddProduct}>Thêm</button>
                                        </div>
                                    </Modal>
           }
           {/* ADD FORM END */}

           {/* DELETE FORM START */}
           {
               modal === 'delete' && <Modal show={show}>
                                            <div>
                                                <div className="w-[100px] mx-auto">
                                                    <img src={selectedProduct?.images.imageUrl} alt="product" />
                                                </div>
                                                <p className="text-xs font-semibold">{selectedProduct?.name}</p>
                                            </div>
                                            <p className="my-2 text-sm font-semibold text-center">Bạn có chắc chắn xóa ?</p>
                                            <div className="flex justify-between">
                                                <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={toggleModal}>Hủy</button>
                                                <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={handleDeleteProduct}>Xóa</button>
                                            </div>
                                        </Modal>
           }
           {/* DELETE FORM END */}
           {
               modal === 'edit' &&  <Modal show={show} className="bg-gray-200 rounded-md overflow-y-scroll max-h-[500px]">
                                        <h1 className="text-center font-semibold text-lg mb-2">Chỉnh sửa sản phẩm</h1>
                                        <div className="flex flex-wrap justify-around">
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Tên sản phẩm</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.name}  name="name" onChange={handleEditChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Mẫu</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.styleId}  name="styleId"  onChange={handleEditChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Màu sắc</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.colorway}  name="colorway"  onChange={handleEditChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Ngày ra mắt</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md"  defaultValue={editProduct.releaseDate?.split('T')[0]} name="releaseDate"  onChange={handleEditChange}/>
                                            </div>
                                            
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Danh mục</label>
                                                <select className="text-sm outline-none rounded-md p-1" name="category"  onChange={handleEditChange}>
                                                    <option value="" selected>--</option>
                                                    {
                                                        categories.map(category => (
                                                            <option key={category._id} selected={editProduct.category === category._id} defaultValue={category._id} value={category._id}>{category.name.toUpperCase()}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Thương hiệu</label>
                                                <select className="text-sm outline-none rounded-md p-1" name="brand"  onChange={handleEditChange}>
                                                    <option value="" selected>--</option>
                                                   {
                                                       brands.map(brand => (
                                                           <option key={brand._id} selected={editProduct.brand=== brand._id} defaultValue={brand._id} value={brand._id}>{brand.name.toUpperCase()}</option>
                                                       ))
                                                   }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Giá niêm yết</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.retailPrice} name="retailPrice" onChange={handleEditChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Năm</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.year} name="year" onChange={handleEditChange}/>
                                            </div>
                                            <div className=" mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Kích cỡ</label>
                                                <div className="flex flex-wrap">
                                                {
                                                        editProduct.category === '614a451f9ce296d085b576e7' && editProduct.category ? sneakerSizes.map(size => (
                                                            <div className="flex flex-col justify-center items-center mr-2 mb-2">
                                                                <label className="text-xs font-medium">{size}</label>
                                                                <input className="" value={size} checked={editProduct.sizes.includes(size)} type="checkbox" name="size" onChange={handleEditCheckBoxChange}/>
                                                            </div>
                                                        )) : 
                                                        null
                                            
                                                }
                                                {
                                                    editProduct.category === '614cb699642efb6914b4209d' && editProduct.category ? 
                                                    streetwearSizes.map(size => (
                                                        <div className="flex flex-col justify-center items-center mr-2 mb-2">
                                                            <label className="text-xs font-medium uppercase">{size}</label>
                                                            <input className="" value={size} type="checkbox" name="size" onChange={handleEditCheckBoxChange}/>
                                                        </div> )) : null
                                                }
                                                </div>
                                            </div>
                                            <div className="flex flex-col mb-4 w-[40%]">
                                                <label className="text-sm font-medium">Ảnh sản phẩm</label>
                                                <input className="text-sm p-1 border-none outline-none" type="file"  accept="image/png, image/gif, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
                                            </div>
                                          
                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm font-medium">Tags</label>
                                                <input className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.tags} name="tags"  onChange={handleEditChange}/>
                                            </div>
                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm font-medium">Mô tả</label>
                                                <textarea className="text-sm p-1 border-none outline-none rounded-md" defaultValue={editProduct.description} rows="5" cols="20" name="description" onChange={handleEditChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <button className="border-[1px] font-semibold text-sm border-black px-4 bg-white" onClick={toggleModal}>Hủy</button>
                                            <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={handleAddProduct} onClick={handleEditProduct}>Xác nhận</button>
                                        </div>
                                    </Modal>
           }
        </div>
    )
}

export default memo(ManageProducts)
