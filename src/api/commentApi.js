import axiosClient from './axiosClient'

const commentApi = {
   createComment: (info) => {
        const url = `/comments`
        return axiosClient.post(url, info)
   }
}

export default commentApi