import React, {useEffect, useState} from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../../redux/actions/authActions'
import { IoIosListBox } from "react-icons/io"
//components
import TabContainer from '../../../components/TabContainer'
import Tab from '../../../components/Tab'
import ProccessingOrders from '../components/ProccessingOrders'

const StaffPage = () => {
    const currentUser = useSelector(state => state.userLogin?.userInfo)
    const dispatch = useDispatch()
    const [user, setUser] = useState({})

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
    }
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        }
       
    }, [currentUser])
    return (
        <div className="">
            <div className="flex items-center justify-between py-3 px-7 border-b border-solid border-gray-400 z-50">
                <Link to="/" className="logo">
                    <span className={"tracking-widest text-red-700"}>Authenti</span>
                    <span className={"tracking-widest text-gray-400"}>city</span>
                </Link>
                <div className="font-semibold cursor-pointer" onClick={handleLogout}>
                    <p>Đăng xuất</p>
                </div>
            </div>
            <div className="flex">
               {
                user.role === 'nhân viên xử lý' ?  
                <>
                    <TabContainer className="w-1/5" user={user}>
                        <Tab icon={<IoIosListBox className="text-[30px] mr-3" />} path='/staff/incoming-orders' tabName="Đơn hàng đang đến" description="Các đơn hàng đang gửi đến kho" />
                        <Tab icon={<IoIosListBox className="text-[30px] mr-3" />} path='/staff/received-orders' tabName="Đơn hàng đã tiếp nhận" description="Các đơn hàng đã đến kho" />
                        <Tab icon={<IoIosListBox className="text-[30px] mr-3" />} path='/staff/checked-orders' tabName="Đơn hàng đã kiểm tra" description="Các đơn hàng đã kiểm tra" />
                        <Tab icon={<IoIosListBox className="text-[30px] mr-3" />} path='/staff/shipped-orders' tabName="Đơn hàng đã gửi" description="Các đơn hàng đã gửi đi" />
                    </TabContainer>
                    <Switch>
                            <Route exact path="/staff/incoming-orders">
                                <ProccessingOrders typeOrder="incoming-orders" title="Các đơn hàng đang đến" />
                            </Route>
                            <Route exact path="/staff/received-orders">
                                <ProccessingOrders typeOrder="received-orders" title="Các đơn hàng đã tiếp nhận" />
                            </Route>
                            <Route exact path="/staff/checked-orders">
                                <ProccessingOrders typeOrder="checked-orders" title="Các đơn hàng đã kiểm tra" />
                            </Route>
                            <Route exact path="/staff/shipped-orders">
                                <ProccessingOrders typeOrder="shipped-orders" title="Các đơn hàng đã gửi" />
                            </Route>
                    </Switch>
                </> :
                      <>
                      <TabContainer className="w-1/5" user={user}>
                          <Tab icon={<IoIosListBox className="text-[30px] mr-3" />} path='/staff/checking-orders' tabName="Đơn hàng đang kiểm tra" description="Các đơn hàng đang kiểm tra" />
                      </TabContainer>
                      <Switch>
                              <Route exact path="/staff/checking-orders">
                                  <ProccessingOrders typeOrder="checking-orders" title="Các đơn hàng đang kiểm tra" />
                              </Route>
                      </Switch>
                  </>
               }
            </div>
        </div>
    )
}

export default StaffPage
