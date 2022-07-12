import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../../../redux/actions/authActions'

import wallpaper from '../../../assets/images/staffbg.jpg'
//components
import Spinner from '../../../components/Spinner'

const StaffLogin = () => {
    const loading = useSelector(state => state.userLogin.loading)
    const user = useSelector(state => state.userLogin.userInfo)
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()
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
            if (user.role === 'nhân viên kiểm tra' || user.role === 'nhân viên xử lý') history.push('/staff')
            if (user.role === 'nhân viên hỗ trợ') history.push('/supporter')
        }
    }, [user])
    return (
        <div className="flex items-center justify-center bg-cover bg-center h-screen z-40" style={{backgroundImage: `url(${wallpaper})`}}>
            <form className="w-[400px] border-[1px] p-4 border-gray-400 rounded-md bg-white z-50 bg-opacity-90" onSubmit={handleSubmit}>
            <h1 className="font-semibold text-center text-2xl mb-4">Đăng nhập <br/> <span className="text-red-700 font-extrabold">Nhân Viên</span></h1>
                <div>
                    <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder="Tài khoản" name="username" onChange={handleOnChange} />
                </div>
                <div>
                    <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder="Mật khẩu" type="password" name="password" onChange={handleOnChange} />
                </div>
                <button className="text-center text-sm w-full bg-red-700 text-white rounded-sm font-semibold py-2"> {loading ? <Spinner /> : <p>Đăng nhập</p>} </button>   
            </form>
            <div className="fixed top-0 left-0 w-full h-full z-[49] bg-black opacity-40"></div>
       </div>
    )
}

export default StaffLogin
