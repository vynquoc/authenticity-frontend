import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userLoginReducer } from './reducers/authReducer'
import { productReducer } from './reducers/productReducer'

const initialState = {}
const reducer = combineReducers({
    userLogin: userLoginReducer,
    currentProductDetail: productReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store