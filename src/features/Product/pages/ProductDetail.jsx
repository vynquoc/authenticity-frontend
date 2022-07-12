import React, { useEffect, useState } from 'react'
import {HiHeart} from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import productApi from '../../../api/productApi'
import portfolioApi from '../../../api/portfolioApi'
import { getProduct } from '../../../redux/actions/productActions'
import useModal from '../../../hooks/useModal'
import { toast } from 'react-toastify'
import {Helmet} from 'react-helmet'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
//components
import Modal from '../../../components/Modal'
import Navbar from '../../../components/Navbar'
import BuySellContainer from '../components/BuySellContainer'
import RecentlyViewed from '../../../components/RecentlyViewed'
import Footer from '../../../components/Footer'


const checkExist = (arr, item) => {
    let found = false
    for (const obj of arr) {
        if (obj._id === item._id) found = true
    }
    return found
}

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [followingSize, setFollowingSize] = useState(null)
    const [loading, setLoading] = useState(true)
    const {show, toggleModal} = useModal()
    const dispatch = useDispatch()
    const params = useParams()
    const {t} = useTranslation()
  
    const {slug} = params
    //CALL API
    const getProductDetails = async () => {
        setLoading(true)
      try {
        const response = await productApi.getBySlug(slug)
        
        setProduct(response.product)
        setLoading(false)
        dispatch(getProduct(response))
      } catch (error) {
            
          setLoading(false)
      }
    }
    
    const handleSizeChange = (size) => {
        setFollowingSize(size)
    }

    const addFollowingProduct = async () => {
        try {
            const response = await portfolioApi.addFollowingProduct(product.id, followingSize)
            console.log(response)
            toast.success('Thêm thành công !')
            toggleModal(!show)
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }    
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [show])
    useEffect(() => {
        window.scrollTo(0, 0)
        getProductDetails()
    }, [params])

    useEffect(() => {
        if (product) {
            if (Object.keys(product).length !== 0) {         
                const storageItems = sessionStorage.getItem('viewedProduct')
                let viewedProduct = JSON.parse(storageItems)
                if (viewedProduct) {
                    if (viewedProduct.length === 10) {
                        viewedProduct.pop()
                    }
                    if (checkExist(viewedProduct, product) === false) {
                        viewedProduct.unshift(product)
                    }
                    sessionStorage.setItem('viewedProduct', JSON.stringify(viewedProduct))
                }
              
            }
        }
    }, [product])

    return (
        <>  
            <Helmet>
                <title>{product?.name}</title>
            </Helmet>
            <div className="relative">
            <Navbar />
            {
               
                <div className="max-w-[1100px] mx-auto mt-20">
                    <HiHeart className="text-4xl border-[1px] block border-gray-300 p-2 ml-auto rounded-full cursor-pointer" onClick={toggleModal}/>
                    {/* PRODUCT IMAGE AND BUY SELL */}
                    {
                        !loading ?
                            <div className="grid grid-cols-12 gap-20 mt-10">
                                <div className="col-span-7">
                                    <h1 className="font-semibold">{product?.name}</h1>
                                    <span className="text-xs border-[1px] rounded-full text-gray-500 px-1 mr-2">100% Authentic</span>
                                    <span className="text-xs border-[1px] rounded-full text-gray-500 px-1">{t("productDetail.condition")}</span>
                                    <div>  
                                        <img className="w-9/12 mx-auto"
                                            src={product?.images?.imageUrl}
                                            alt="product"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-5">
                                    <BuySellContainer slug={slug}/>
                                </div>
                            </div>
                    :
                            <div className="grid grid-cols-12 gap-20 mt-10">
                                <div className="col-span-7">
                                         <div><Skeleton width={500} /></div>
                                        <span className="text-xs border-[1px] rounded-full text-gray-500 px-1 mr-2">100% Authentic</span>
                                        <span className="text-xs border-[1px] rounded-full text-gray-500 px-1">Tình trạng: Mới</span>
                                        <div className="p-10">
                                            <Skeleton height={240} />
                                        </div>
                                </div>
                                <div className="col-span-5">
                                    <BuySellContainer loading={loading} slug={slug}/>
                                </div>
                            </div>
                    }
                    {/* PRODUCT DESCRIPTION */}
                    <div className="mb-5">
                        <hr className="border-t" />
                        <h3 className="bg-black inline-block text-white py-1 px-2 mb-5">{t("productDetail.detailTitle.1")}</h3>
                        <div className="flex justify-between">
                            <div className="w-5/12">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">Style ID</span>
                                    {loading ? <Skeleton width={100} /> : <p className="font-semibold text-sm">{product?.styleId}</p>}
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">{t("productDetail.colorway")}</span>
                                    {loading ? <Skeleton width={100} /> : <p className="font-semibold text-sm">{product?.colorway}</p>}
                                    
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">{t("productDetail.retail")}</span>
                                    {loading ? <Skeleton width={40} /> : <p className="font-semibold text-sm">$ {product?.retailPrice}</p>}
                                    
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">{t("productDetail.release")}</span>
                                    
                                    {loading ? <Skeleton width={50} /> :<p className="font-semibold text-sm">{product?.releaseDate?.split('T')[0]}</p>}
                                </div>
                            </div>
                            <div className="w-6/12">
                                <h4 className="font-semibold mb-2">{t("productDetail.description")}</h4>
                                {
                                    product?.description ?
                                    <p className="text-xs tracking-wide leading-5" dangerouslySetInnerHTML={{ __html: product['description']}}></p> : <p>{t("productDetail.notUpdate")}</p>
                                }
                            </div>
                        </div>
                </div>
                {/* RECENTLY VIEWED */}
                <div className="mb-5">
                    <hr className="border-t" />
                    <h3 className="bg-black inline-block text-white py-1 px-2 mb-5">{t("productDetail.detailTitle.2")}</h3>
                    <RecentlyViewed currentProduct={product} />
                </div>
                <Modal show={show} toggleModal={toggleModal} className="min-w-[315px]">
                    <h1 className="text-center mb-4 font-semibold">{t("productDetail.addFollowing")}</h1>
                    <p className="font-semibold mb-2">{t("productDetail.chooseSize")}</p>
                   <div className="flex flex-wrap">
                    {
                        product.sizes?.map((size) => (
                            <div className={"w-[12%] text-center py-1 border-[1px] mr-2 mb-2 font-semibold cursor-pointer hover:bg-gray-300 " + (followingSize === size ? "bg-black text-white" : "")} onClick={() => handleSizeChange(size)}>{size}</div>
                        ))
                    }
                   </div>
                    <div className="flex justify-around py-4">
                       <button className="border-[1px] border-black py-1 w-[80px] text-sm font-semibold" onClick={toggleModal}>{t("cancel")}</button>
                       <button  className={"bg-black text-white py-1 w-[80px] text-sm font-semibold " + (!followingSize ? "bg-gray-200" : "")} onClick={addFollowingProduct}>{t("confirm")}</button>
                    </div>
                </Modal>
              </div>
            }
            <Footer />
        </div>
        </>
    )
}

export default ProductDetail
