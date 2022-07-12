import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import newsApi from '../../../api/newsApi'
import Navbar from '../../../components/Navbar'
import NewsBanner from '../../../assets/images/newscate.jpg'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'

const NewsPage = () => {
    const [newses, setNewses] = useState([])
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation()
    const getAllNews = async () => {
        setLoading(true)
        try {
            const response = await newsApi.getAllNews()
            setLoading(false)
            setNewses(response.newses)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllNews()
    }, [])
   
    return (
        <div>
            <Navbar />
                <div style={{backgroundImage: `url(${NewsBanner})`}} className="min-h-[280px] mt-14 px-12 mx-auto pt-20 pb-12 bg-cover bg-center">
                    <h1 className="text-5xl font-semibold mb-6 text-white">{t("news.banner")} <br /> Sneakers - Streewear</h1>
                </div>
            <div className="max-w-[1100px] mx-auto">
                <h1 className="text-xl text-gray-400 capitalize my-[50px]">{t("news.title")} </h1>
                <div>
                    {
                        !loading ? 
                        newses.map(news => (
                            <Link to={`/news/${news.slug}`} key={news._id} className="flex border-[1px]  mb-4  overflow-hidden hover:shadow-lg">
                                <div className="w-[20%] h-[120px] overflow-hidden mr-4">
                                    <img src={news.thumbnail} alt="news-content" className="w-full h-full" />
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <h2 className="font-medium ">{news.title}</h2>
                                    <p className="ml-auto text-gray-400 text-sm"><span>{news.createdAt?.split('T')[0]}, </span>{news.createdBy?.name}</p>
                                </div>
                            </Link>
                        )) 
                        :
                        [1, 2, 3, 4, 5].map(i => <div className="flex border-[1px]  mb-4  overflow-hidden">
                        <div className="w-[20%] h-[120px] overflow-hidden mr-4">
                            <Skeleton height={130} />
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                                <Skeleton width={400} />
                            
                        </div>
                </div>)
                    }
                 
                </div>
            </div>
        </div>
    )
}

export default NewsPage
