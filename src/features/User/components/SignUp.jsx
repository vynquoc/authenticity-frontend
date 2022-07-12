import React, { useEffect, useState } from 'react'
import authApi from '../../../api/authApi'

import { FcCheckmark } from "react-icons/fc"
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Spinner from '../../../components/Spinner'

const SignUp = ({toggleActive, onToggleActive}) => {
    const {t} = useTranslation()
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const handleOnChange = (event) => {
       setInfo({
           ...info,
           [event.target.name]: event.target.value
       })
    }

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
       try {
            await authApi.signup(info)
            setIsSuccess(true)
            setLoading(false)
       } catch (error) {
           const errors = error.response.data.message.split('-')
           errors.forEach(err => toast.error(err, {autoClose: 3000}))
           setLoading(false)
       }
    }
    useEffect(() => {
        setIsSuccess(false)
        setInfo({})
    }, [toggleActive])
    return (
       <>
        {
            isSuccess ? 
            <div className={"w-full flex justify-center flex-col items-center font-semibold  " + (toggleActive === 1 ? "" : "hidden")}>
                <FcCheckmark className="text-9xl border-2 rounded-[100%] border-green-600 my-7 ani animate-success-check"/>
                <p>{t("signUp.8")}</p>
                <p><span className="text-red-700 underline cursor-pointer" onClick={() => onToggleActive(2)}>{t("signIn.1")}</span> {t("signUp.9")}</p>
            </div>
            : 
            
           
               <>
                {
                    toggleActive === 1 &&   <form  onSubmit={handleSubmit}>
                    <div>
                        <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signUp.2")} name="name" onChange={handleOnChange} />
                    </div>
                    <div>
                        <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signUp.3")} name="username"  onChange={handleOnChange} />
                    </div>
                    <div>
                        <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signUp.4")} name="email" onChange={handleOnChange} />
                    </div>
                    <div>
                        <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signUp.5")} type="password" name="password" onChange={handleOnChange}  />
                    </div>
                    <div>
                        <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder={t("signUp.6")} type="password" name="passwordConfirm" onChange={handleOnChange}  />
                    </div>
                    <button className="text-center  text-xs w-full bg-red-700 text-white py-2 rounded-sm font-semibold">{loading ? <Spinner borderColor={"border-white"} /> : <p>{t("signUp.1")}</p>}</button>
                    <p className="text-xs mt-3">{t("signUp.7")}<span className="text-red-700 font-semibold underline cursor-pointer" onClick={() => onToggleActive(2)}>{t("signIn.")}</span></p>
                </form>
                }
               </>
           
        }
       </>
    )
}

export default SignUp
