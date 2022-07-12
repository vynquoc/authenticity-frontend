import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserByToken } from './redux/actions/authActions'
import authApi from './api/authApi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from 'react-helmet'
import FullSpinner from './components/FullSpinner'
//routes
import ProtectedRoute from './routes/ProtectedRoute'
import StaffRoute from './routes/StaffRoute'
import AdminRoute from './routes/AdminRoute'
//pages
import Home from './pages/Home'
import TranslateButton from './features/Translation/components/TranslateButton'
const ProductDetail = React.lazy(() => import( './features/Product/pages/ProductDetail'))
const SellPage = React.lazy(() => import( './features/Selling/pages/SellPage'))
const BuyPage = React.lazy(() => import( './features/Buying/pages/BuyPage'))
const LoginPage = React.lazy(() => import( './features/User/pages/LoginPage'))
const UserPage = React.lazy(() => import( './features/User/pages/UserPage'))
const SearchPage = React.lazy(() => import( './features/Product/pages/SearchPage'))
const AdminPage = React.lazy(() => import( './features/Admin/pages/AdminPage'))
const StaffPage = React.lazy(() => import( './features/Staff/pages/StaffPage'))
const StaffLogin = React.lazy(() => import( './features/Staff/pages/StaffLogin'))
const NewsDetail = React.lazy(() => import( './features/News/pages/NewsDetail'))
const NotFound = React.lazy(() => import( './pages/NotFound'))
const NewsPage = React.lazy(() => import( './features/News/pages/NewsPage'))
const AdminLogin = React.lazy(() => import( './features/Admin/pages/AdminLogin'))
const SupporterPage = React.lazy(() => import( './features/Staff/pages/SupporterPage'))
const CategoryPage = React.lazy(() => import('./features/Product/pages/CategoryPage'))


const App = () => {
  const dispatch = useDispatch()
  const getUser = async () => {
    //call api
    const response = await authApi.getUserByToken()
    //dispatch action
    if (Object.keys(response.user).length !== 0) {
      dispatch(getUserByToken(response.user))
    }
  }
  getUser()
  useEffect(() => {
    sessionStorage.setItem('viewedProduct', JSON.stringify([]))
  }, [])

  return (
   <>
      <Helmet>
        <title>Authenticity: Sneakers, Streetwear</title>
      </Helmet>
      <div className="App">
        <Suspense fallback={<FullSpinner />}>
          <Route exact path="/" component={Home} />
          <Switch>
            <Route path="/products" component={CategoryPage} />
            <ProtectedRoute path="/account" component={UserPage} />
            <ProtectedRoute exact path="/sell/:slug" component={SellPage} />
            <ProtectedRoute exact path="/buy/:slug" component={BuyPage} />
            <AdminRoute path="/admin" component={AdminPage} />
            <StaffRoute path="/staff" component={StaffPage} />
            <StaffRoute path="/supporter" component={SupporterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path='/staff-login' component={StaffLogin} />
            <Route exact path='/admin-login' component={AdminLogin} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/news" component={NewsPage} />
            <Route exact path="/:slug" component={ProductDetail} />
            <Route exact path="/news/:slug" component={NewsDetail} />
        
          </Switch>
        </Suspense>
        <ToastContainer autoClose={2000} hideProgressBar={true} />

      </div>
      {/* <Chat /> */}
      <TranslateButton />
   </>
  )
}

export default App
