import axiosClient from './axiosClient'

const productApi = {
    getAll: (params) => {
        const url = '/products'
        return axiosClient.get(url, { params })
    },
    getBySlug: (slug) => {
        const url = `/${slug}`
        return axiosClient.get(url)
    },
    getAskAndBid: (slug, size) => {
        const url = `/order/${slug}?size=${size}`
        return axiosClient.get(url)
    },
    getNewestSneakers: () => {
        const url = `/top-5-newest-sneakers`
        return axiosClient.get(url)
    },
    getNewestStreetwear: () => {
        const url = `/top-5-newest-streetwear`
        return axiosClient.get(url)
    },
    getNewestCollectibles: () => {
        const url = `/top-5-newest-collectibles`
        return axiosClient.get(url)
    },
    searchProducts: (kw) => {
        const url = `/search?s=${kw}`
        return axiosClient.get(url)
    },
    getLastSale: (product, size) => {
        const url = `/get-last-sale/${product}/${size}`
        return axiosClient.get(url)
    },
    getAllBids: (product, size) => {
        const url = `/get-size-bids/${product}/${size}`
        return axiosClient.get(url)
    },
    getAllAsks: (product, size) => {
        const url = `/get-size-asks/${product}/${size}`
        return axiosClient.get(url)
    },
    getAllSale: (product, size) => {
        const url = `/get-all-sale/${product}/${size}`
        return axiosClient.get(url)
    },
}

export default productApi