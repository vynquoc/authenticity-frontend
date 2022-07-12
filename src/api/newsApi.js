import axiosClient from './axiosClient'

const newsApi = {
   getNews: (slug) => {
        const url = `/news/${slug}`
        return axiosClient.get(url)
   },
   getAllNews: () => {
      const url = `/news`
      return axiosClient.get(url)
   },
   deleteNews: (slug) => {
      const url = `/news/${slug}`
      return axiosClient.delete(url)
   },
   getNewestNews: () => {
      const url = `/news/get-newest-newses`
      return axiosClient.get(url)
   }
}

export default newsApi