import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/authActions'
import { useTranslation } from 'react-i18next'
//component
import SearchBar from './SearchBar'

const Navbar = ({navbar, navlist ,logo, subLogo, home}) => {
     const user = useSelector(state => state.userLogin.userInfo)
     const dispatch = useDispatch()
     const {t, i18n} = useTranslation()
     const handleLogout = () => {
         dispatch(logout())
         localStorage.removeItem('token')
     }

     return (
        <div className={"flex justify-between items-center w-full  py-3 px-7 fixed top-0 transition ease-in-out duration-300 border-b border-solid border-gray-400 z-50 " + ((navbar === '' || typeof navbar === 'undefined' ) ? 'bg-white' : 'bg-transparent border-none')}>
            {
                home ? 
                    <Link to="/" className="logo">
                        <span className={"tracking-widest " + (logo === '' ? 'text-red-700' : 'text-white')}>Authenti</span>
                        <span className={"tracking-widest " + (subLogo === '' ? 'text-gray-400' : 'text-white')}>city.</span>
                    </Link> 
                 :
                    <Link to="/" className="logo">
                        <span className="main-logo-text">Authenti</span>
                        <span className="sub-logo-text">city.</span>
                    </Link>
            }
            {/* render searchbar */}
            {
                !home && <SearchBar homepage={home} />
            }
            <div className={`flex justify-between items-center font-medium text-sm ${navlist}`}>
                <Link to="/">
                    <span className="ml-5">{t('navbar.1')}</span>
                </Link>
                <Link to="/products">
                    <span className="ml-5">{t('navbar.2')}</span>
                </Link >
                <Link to="/news">
                    <span className="ml-5">{t('navbar.3')}</span>
                </Link>
                {
                    user 
                    ? [
                    <Link to="/account/info">
                        <span className="ml-5">{t('navbar.6')}</span>
                    </Link>,
                    <Link to="/">
                        <span className={"ml-5 rounded-3xl"} onClick={handleLogout}>{t('navbar.5')}</span>
                    </Link>
                    ]
                    : 
                    <Link to="/login">
                        <span className="ml-5">{t('navbar.4')}</span>
                    </Link> 
                }
                
            </div>
        </div>
    )
}

export default Navbar
