
import authApi from '../../api/authApi'
import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGGEDIN, USER_LOGOUT } from '../constants/authConstant'
import { toast } from 'react-toastify'


export const login = (username, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } })
    try {
        const response = await authApi.logIn(username, password)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.user })
        localStorage.setItem("token", response.token)
    } catch (error) {
        toast.error(error.response?.data.message, {
            autoClose: 3000,
            hideProgressBar: true,

        })
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data
        })
    }
}

export const getUserByToken = (user) => (dispatch) => {
    dispatch({ type: USER_LOGGEDIN, payload: { ...user } })
}

export const logout = () => (dispatch) => {
    delete axios.defaults.headers.common['Authorization']

    dispatch({ type: USER_LOGOUT })
}

