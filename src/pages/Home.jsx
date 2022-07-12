import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'
import {Helmet} from 'react-helmet'

//components
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import CategoriesBar from '../components/CategoriesBar'
import Carousel from '../components/Carousel'
import PopularBrand from '../components/PopularBrand'
import HomeCategories from '../components/HomeCategories'
import Footer from '../components/Footer'
import LatestNews from '../components/LatestNews'


const Home = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const dispatch = useDispatch()
    
    const [navBarTrans, setNavBarTrans] = useState('border-none bg-transparent')
    const [navListWhite, setNavListWhite] = useState('text-white')
    const [logoWhite, setLogoWhite] = useState('text-white')
    const [subLogoWhite, setSubLogoWhite] = useState('text-white')

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 0
            if (show) {
                setNavBarTrans('')
                setNavListWhite('')
                setLogoWhite('')
                setSubLogoWhite('')
            } else {
                setNavListWhite('text-white')
                setNavBarTrans('border-none bg-transparent')
                setLogoWhite('!text-white')
                setSubLogoWhite('!text-white')
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (user) {
            if (user.role !== 'người dùng') {
                dispatch(logout())
                localStorage.removeItem('token')
            }
        }
    }, [user, dispatch])
   
    return (
        <> 
            <Helmet>
                <title>Trang chủ | Authenticity</title>
            </Helmet>
            <div className="homepage">
              
                <Navbar navbar={navBarTrans} navlist={navListWhite} logo={logoWhite} subLogo={subLogoWhite} home={true} />
                <Banner home={true}/>
                <CategoriesBar />
                <Carousel />
                <div className="max-w-screen-lg my-0 mx-auto">
                    <PopularBrand />
                    <HomeCategories />
                    <div className="">
                        <LatestNews />
                    </div>
                </div>
                <Footer />
                
            </div>
        </>
    )
}

export default Home
