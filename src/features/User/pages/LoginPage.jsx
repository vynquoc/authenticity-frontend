import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion/dist/es/index'
import { useTranslation } from 'react-i18next'
//component
import SignUp from '../components/SignUp'
import Login from '../components/Login'
const LoginPage = () => {
    const {t} = useTranslation()
    const [toggleActive, setToggleActive] = useState(2)
    const handleToggleActive = (index) => {
        setToggleActive(index)
    }
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className="h-screen">
            <Link to="/" className="logo text-center block py-4 text-4xl border-b-[1px]">
                    <span className="main-logo-text">Authenti</span>
                    <span className="sub-logo-text">city</span>
            </Link>
            <div className="bg-gray-100 h-full p-4">
                <div className="max-w-max bg-white mx-auto p-6 pt-0 min-w-[400px]">
                    <div className="w-full flex justify-between">
                        <button className={"w-[48%] text-xs py-4 border-b-2 border-gray-400 mb-2 " + (toggleActive === 1 ? "!border-black" : "")} onClick={() => handleToggleActive(1)}>{t("signUp.1")}</button>
                        <button className={"w-[48%] text-xs py-4 border-b-2 border-gray-400 mb-2 " + (toggleActive === 2 ? "!border-black" : "")} onClick={() => handleToggleActive(2)}>{t("signIn.1")}</button>
                    </div>
                    <SignUp toggleActive={toggleActive} onToggleActive={handleToggleActive} />
                    <Login toggleActive={toggleActive} onToggleActive={handleToggleActive}  />
                </div>
            </div>
        </motion.div>
    )
}

export default LoginPage
