import React from 'react'
//components


const TabContainer = ({className, user, children}) => {
    // const user = useSelector(state => state.userLogin.userInfo)
    return (
        <div className={`pb-3 pt-3 pl-3 mb-[-20px] bg-gray-100 ` + className }>
        {user.role === 'người dùng' ? <p className="font-bold text-center text-xl mb-7">{user.name}</p> : <p className="font-bold text-xl text-center mb-7">{user.role?.toUpperCase()}</p>}
        {
            children
        }
        </div>
    )
}

export default TabContainer
 