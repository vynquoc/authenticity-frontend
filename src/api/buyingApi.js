import axiosClient from './axiosClient'

const buyingApi = {
    placeBid: (shippingInfo, product, productSize, price, totalPrice, expireDays) => {
        const url = `/bids`
        return axiosClient.post(url, { product, productSize, price, totalPrice, expireDays, shippingInfo })
    },
    deleteBid: (id) => {
        const url = `/bids/delete/${id}`
        return axiosClient.delete(url)
    },
    createOrderByBuy: (ask, product, productSize, price, totalPrice, shippingInfo) => {
        const url = `/orders`
        return axiosClient.post(url, { ask, product, productSize, price, totalPrice, shippingInfo })
    }
}

export default buyingApi