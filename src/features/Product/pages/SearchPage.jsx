import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import productApi from '../../../api/productApi'
import Navbar from '../../../components/Navbar'

const SearchPage = () => {
    const queryParams = useLocation().search
    const keyword = new URLSearchParams(queryParams).get('s')
    const [results, setResults] = useState([])

    const searchProducts = async () => {
        try {
            const response = await productApi.searchProducts(keyword)
            setResults(response.products)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        if (keyword) {
         searchProducts()
        }
     }, [keyword])
    return (
        <div className="">
            <Navbar />
            <div className="max-w-screen-lg mx-auto">
                <p className="mt-[100px] font-bold text-2xl mb-4">Kết quả tìm kiếm cho "{keyword}"</p>
                {
                    results.length !== 0 ? 
                    <div>
                    {
                        results.map((product) => {
                            return <Link to={`/${product.slug}`}>
                            <div key={product.id} className="flex items-center border-b-[1px] py-4 pl-2">
                                <div className="w-[100px] mr-2">
                                    <img src={product.images.smallImageUrl} alt="product" />
                                </div>
                                <div>
                                    <p className="text-xs">{product.brand.name}</p>
                                    <p className="text-sm font-bold">{product.name}</p>
                                    <p className="text-xs font-semibold">{product.colorway}</p>
                                </div>
                            </div>
                    </Link>
                                    
                        })     
                    }
                    </div> :
                    <p>Không tìm thấy. Bạn có thể gửi yêu cầu thêm sản phẩm</p>
                }
            </div>
        </div>
    )
}

export default SearchPage
