
import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConstant'

export const getProduct = (product) => (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: { ...product } })
}