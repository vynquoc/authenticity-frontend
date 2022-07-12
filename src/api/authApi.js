import axiosClient from './axiosClient'

const authApi = {
    logIn: (username, password) => {
        const url = '/users/login'
        return axiosClient.post(url, { username, password })
    },
    signup: (info) => {
        const url = '/users/signup'
        return axiosClient.post(url, info)
    },
    updateUser: (id, info) => {
        const url = `/users/${id}`
        return axiosClient.patch(url, info)
    },
    getUserByToken: () => {
        const url = '/users/check-token'
        return axiosClient.get(url)
    }
}

export default authApi