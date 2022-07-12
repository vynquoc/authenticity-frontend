import axiosClient from './axiosClient'

const portfolioApi = {
    getBids: (userId) => {
        const url = `/get-user-bids/${userId}`
        return axiosClient.get(url)
    },
    getOrdersCount: () => {
        const url = `/get-orders-count`
        return axiosClient.get(url)
    },
    getBuyingPending: (userId) => {
        const url = `/get-buying-pending/${userId}`
        return axiosClient.get(url)
    },
    getBuyingHistory: (userId) => {
        const url = `/get-buying-history/${userId}`
        return axiosClient.get(url)
    },
    getAsks: (userId) => {
        const url = `/get-user-asks/${userId}`
        return axiosClient.get(url)
    },
    getAskingPending: (userId) => {
        const url = `/get-asking-pending/${userId}`
        return axiosClient.get(url)
    },
    getAskingHistory: (userId) => {
        const url = `/get-asking-history/${userId}`
        return axiosClient.get(url)
    },
    addFollowingProduct: (productId, size) => {
        const url = `/add-following`
        return axiosClient.post(url, {
            productId,
            size
        })
    },
    getFollowing: (userId) => {
        const url =`/get-following/${userId}`
        return axiosClient.get(url)
    },
    deleteFollowing: (followingId) => {
        const url = `/delete-following/${followingId}`
        return axiosClient.delete(url)
    }
}

export default portfolioApi