import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import newsApi from '../api/newsApi'
import { useTranslation } from 'react-i18next'
const LatestNews = () => {
    const [newses, setNewses] = useState([])
    const {t} = useTranslation()
    const getNewses = async () => {
        try {
            const response = await newsApi.getNewestNews()
            setNewses(response.newses)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getNewses()
    }, [])
    return (
        <div className="col-span-5 my-10">
            <div className="flex justify-between mb-4">
                <h2 className="font-semibold text-xl">{t("latestNews")}</h2>
                <Link to="/news" className="text-sm font-medium">{t("seeAll")}</Link>
            </div>
            {
                newses.map(news => (
                    <Link to={`/news/${news.slug}`} className="flex border-solid border-b-2 border-gray-200 mb-4 pb-2" key={news._id}>
                        <div className="flex-1 rounded-lg overflow-hidden mr-6 h-[120px] ">
                            <img src={news.thumbnail} alt={news.slug} className="h-full w-full" />
                        </div>
                       <div className="w-[80%] flex flex-col justify-between">
                            <h1 className="font-semibold">{news.title}</h1>
                            <h3 className="font-medium text-xs text-gray-500 ml-auto">{news.createdBy.name} - {news.createdAt.split('T')[0]}</h3>
                       </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default LatestNews





