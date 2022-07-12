import axiosClient from './axiosClient'

const sellingApi = {
    placeAsk: (shippingInfo, product, productSize, price, totalPrice, expireDays) => {
        const url = `/asks`
        return axiosClient.post(url, { product, productSize, price, totalPrice, expireDays, shippingInfo })
    },
    deleteAsk: (id) => {
        const url = `/asks/delete/${id}`
        return axiosClient.delete(url)
    },
    createOrderBySell: (bid, product, productSize, price, totalPrice, shippingInfo) => {
        const url = `/orders`
        return axiosClient.post(url, { bid, product, productSize, price, totalPrice, shippingInfo })
    }
}

export default sellingApi