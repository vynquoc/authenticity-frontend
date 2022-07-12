import axiosClient from './axiosClient'

const adminApi = {
    addStaff: (staffInfo) => {
        const url ='/users'
        return axiosClient.post(url, staffInfo)
    },
    deleteStaff: (staffId) => {
        const url = `/users/${staffId}`
        return axiosClient.delete(url)
    },
    editStaff: (staffId, info) => {
        const url = `/users/${staffId}`
        return axiosClient.patch(url, info)
    },
    getAllStaff: () => {
        const url = '/admin/get-staffs'
        return axiosClient.get(url)
    },
    createNews: (info) => {
        const url = '/news'
        return axiosClient.post(url, info)
    },
    getCategoriesAndBrands: () => {
        const url = '/admin/get-categories-brands'
        return axiosClient.get(url)
    },
    addProduct: (productInfo) => {
        const url = '/products'
        return axiosClient.post(url, productInfo)
    },
    deleteProduct: (productId) => {
        const url = `/products/${productId}`
        return axiosClient.delete(url)
    },
    getAllProducts: (keyword) => {
        const url = `/admin/get-all-products?s=${keyword}`
        return axiosClient.get(url)
    },
    editProduct: (productId, productInfo) => {
        const url = `/products/${productId}`
        return axiosClient.patch(url, productInfo)
    },
    getOrderStatistics: () => {
        const url = `/admin/get-order-statistics`
        return axiosClient.get(url)
    },
    getProductStatistics: (type) => {
        const url = `/admin/get-product-statistics/${type}`
        return axiosClient.get(url)
    },
    getRevenueStatistics: () => {
        const url = `/admin/get-revenue-statistics`
        return axiosClient.get(url)
    }

}

export default adminApi