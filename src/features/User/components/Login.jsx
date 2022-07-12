import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../../../redux/actions/authActions'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import Spinner from '../../../components/Spinner'

const Login = ({toggleActive, onToggleActive}) => {
    const loading = useSelector(state => state.userLogin.loading)
    const user = useSelector(state => state.userLogin.userInfo)
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const handleOnChange = (event) => {
       setUserInfo({
           ...userInfo,
           [event.target.name]: event.target.value
       })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
       dispatch(login(userInfo.username, userInfo.password))
    }
    useEffect(() => {
        if (user) {
            if (user.role === 'người dùng')  history.goBack()
        }
        
    }, [user])
    return (
        <form className={toggleActive === 2 ? "" : "hidden"} onSubmit={handleSubmit}>
        <div>
            <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signIn.2")} name="username" onChange={handleOnChange} />
        </div>
        <div>
            <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signIn.3")} type="password" name="password" onChange={handleOnChange} />
        </div>
        <button className="text-center text-xs w-full bg-red-700 text-white rounded-sm font-semibold py-2"> {loading ? <Spinner borderColor={"border-white"} /> : <p>{t("signIn.1")}</p>} </button>
        <div  className="text-xs mt-3 flex justify-between">
            <p>{t("signIn.4")}<span className="text-red-700 font-semibold underline cursor-pointer" onClick={() => onToggleActive(1)}>{t("signUp.1")}</span></p>
            <p className="text-red-700 font-semibold underline cursor-pointer">{t("signIn.5")}</p>
        </div>
     
    </form>
    )
}

export default Login
