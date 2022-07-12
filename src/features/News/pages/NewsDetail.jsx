import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import newsApi from '../../../api/newsApi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
//components
import Navbar from '../../../components/Navbar'
import CommentsSection from '../components/CommentsSection'
import Skeleton from 'react-loading-skeleton'

const NewsDetail = () => {
    const [news, setNews] = useState({})
    const [comments, setComments] = useState([])
    const {t} = useTranslation()
    const [otherNews, setOtherNews] = useState([])
    const [scroll, setScroll] = useState(false)
    const [loading, setLoading] = useState(true)
    const params = useParams()
  
    const {slug} = params
    const getNews = async (slug) => {
        setLoading(true)
        try {
            const response = await newsApi.getNews(slug)
            setNews(response.news)
            setComments(response.news.comments)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.response)
        }
    }
    const getOtherNews = async () => {
        setLoading(true)
        try {
            const response = await newsApi.getAllNews()
            setLoading(false)
        setOtherNews(response.newses)
        } catch (error) {
            setLoading(false)
        }
    }
    const handleNewComment = (newComment) => {
        setComments([...comments, newComment])
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getNews(slug)
        getOtherNews()
    }, [params])

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 100
            if (show) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div>
            <Navbar />
           <div className="flex mt-[100px] max-w-[1200px] mx-auto">
              {
                  !loading ?
                  <div className="p-8 w-[80%]">
                    <h1 className="font-bold text-4xl mb-6">{news.title}</h1>
                    <p className="mb-10 text-sm text-gray-400">{news.createdAt?.split('T')[0]}, <span>{news.createdBy?.name}</span></p>
                    <div className="w-3/4" dangerouslySetInnerHTML={{ __html: news["content"] }}></div>
                    <CommentsSection news={news} newsComments={comments} onNewComment={handleNewComment} />
                  </div>
                  :
                  <div className="p-8 w-[80%]">
                      <h1  className="mb-6"><Skeleton /></h1>
                      <Skeleton width={200} />
                      <p className="mb-10 text-sm text-gray-400"><Skeleton width={50} /></p>
                      <Skeleton height={500} width={600} />
                  </div>
              }
               <div className={"mt-[300px] w-[25%] bg-white z-50 p-2 h-[fit-content] fixed right-0 top-0 mr-4 border-[1px] border-gray-300 overflow-auto transition-all duration-300 " + (scroll ? "!mt-[62px]" : "")}>
                   <h1 className="font-bold bg-red-700 text-white py-1 px-2">Các tin khác</h1>
                  {
                      !loading ?
                   
                        otherNews.filter(n => n._id !== news._id).map(news => (
                        <Link to={`/news/${news.slug}`} className="flex mb-4 border-b-[1px] p-1">
                            <div className="w-[30%] mr-2">
                                <img src={news.thumbnail} alt="news-thumbnail" className="w-full" />
                            </div>
                            <p className="flex-1 text-xs font-medium line-clamp-2">{news.title}</p>
                        </Link>
                        ))
                  :
                   [1, 2, 3, 4, 5].map(i => (
                    <div className="flex mb-4 border-b-[1px] p-1">
                        <div className="w-[30%] mr-2">
                            <Skeleton height={80} width={100} />
                        </div>
                        <div className="flex-1 ml-4">
                        <Skeleton />
                        <Skeleton width={80} />
                        </div>
                    </div>
                   ))
                  }
                  
               </div>
           </div>
        </div>
    )
}

export default NewsDetail
