import React, {useState, useEffect} from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiUser, FiArchive, FiPieChart } from "react-icons/fi"
import { BiNews } from "react-icons/bi"
//components
import TabContainer from '../../../components/TabContainer'
import Tab from '../../../components/Tab'
import ManageStaff from '../components/ManageStaff'
import ManageProducts from '../components/ManageProducts'
import Statistics from '../components/Statistics'
import ManageNews from '../components/ManageNews'

const AdminPage = () => {
    const currentUser = useSelector(state => state.userLogin?.userInfo)
    const [user, setUser] = useState({})
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        }
    }, [currentUser])
    return (
        <div className="flex mt-16">
            <div className="flex justify-between items-center w-full  py-3 px-7 fixed top-0 border-b border-solid border-gray-400 z-50 bg-white">
                <Link to="/" className="logo">
                    <span className={"tracking-widest text-red-700"}>Authenti</span>
                    <span className={"tracking-widest text-gray-400"}>city</span>
                </Link>
            </div>
            <TabContainer className="w-1/5" user={user}>
                 <Tab icon={<FiUser className="text-[30px] mr-3" />} path='/admin/manage-staffs' tabName="Nhân viên" description="Quản lý nhân viên" />
                 <Tab icon={<FiArchive className="text-[30px] mr-3" />} path='/admin/manage-products' tabName="Sản phẩm" description="Quản lý sản phẩm" />
                 <Tab icon={<FiPieChart className="text-[30px] mr-3" />}  path='/admin/statistics' tabName="Thống kê" description="Thông tin thống kê" />
                 <Tab icon={<BiNews className="text-[30px] mr-3" />}  path='/admin/news' tabName="Tin tức" description="Quản lý tin tức" />
            </TabContainer>
            <Switch>
                    <Route exact path="/admin/manage-staffs">
                        <ManageStaff />
                    </Route>
                    <Route exact path="/admin/manage-products">
                        <ManageProducts  />
                    </Route>
                    <Route exact path="/admin/statistics">
                        <Statistics  />
                    </Route>
                    <Route exact path="/admin/news">
                        <ManageNews  />
                    </Route>
            </Switch>
        </div>
    )
}

export default AdminPage
