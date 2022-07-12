import axiosClient from './axiosClient'

const staffApi = {
    getOrders: (typeOrder) => {
        const url = `/staff/get-orders/${typeOrder}`
        return axiosClient.get(url)
    },
    updateOrder: (orderId, updateInfo) => {
        const url = `/orders/${orderId}`
        return axiosClient.patch(url, updateInfo)
    }
}

export default staffApi