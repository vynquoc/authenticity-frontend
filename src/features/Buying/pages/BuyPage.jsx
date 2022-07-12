import React, {useEffect, useState} from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import productApi from '../../../api/productApi';
import { FaGripLinesVertical } from "react-icons/fa";
//components
import BuyContainer from '../components/BuyContainer';

const BuyPage = () => {
    const search = useLocation().search
    const size = new URLSearchParams(search).get('size')
    const params = useParams()
    const [product, setProduct] = useState({})
    const [highestBid, setHighestBid] = useState({})
    const [lowestAsk, setLowestAsk] = useState({})
    const {slug} = params
    const getProduct = async () => { 
        try {
            const response = await productApi.getAskAndBid(slug, size)
            setProduct(response.product)
            setHighestBid(response.highestBid)
            setLowestAsk(response.lowestAsk)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            <div className="p-4 border-b-[1px] w-full mb-5 flex justify-between items-center">
                <Link to="/" className="logo">
                    <span className="main-logo-text">Authenti</span>
                    <span className="sub-logo-text">city</span>
                </Link>
                <Link to="/" className="text-sm font-semibold">Trợ giúp</Link>
            </div>
            <div className="max-w-[1100px] mx-auto flex">
                <div className="w-7/12 text-center">
                    <h1 className="font-extrabold text-2xl">{product.name}</h1>
                    <div className="mb-2">
                        <span className="text-xs font-medium">Giá trả cao nhất: </span>
                        <span className="font-semibold">$ {highestBid?.price ? highestBid.price : '--'}</span>
                            <FaGripLinesVertical className="inline"/>
                        <span className="text-xs font-medium">Giá bán thấp nhất: </span>
                        <span className="font-semibold">$ {lowestAsk  ? lowestAsk.price : '--'}</span>
                    </div>
                    <p className="text-md">Size: <span className="font-bold">{size}</span></p>
                    <div>
                        <img
                            className="w-9/12 mx-auto"
                            src={product.images?.imageUrl}
                            alt="sneakers" />
                    </div>
                </div>
                <div className="w-5/12 p-7 bg-gray-100 relative">
                    <BuyContainer lowestAsk={lowestAsk} highestBid={highestBid} size={size} product={product}/>
                </div>
            </div>
        </div>
    )
}

export default BuyPage
