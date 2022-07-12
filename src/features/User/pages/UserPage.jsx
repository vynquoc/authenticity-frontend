import React, {useEffect, useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiUser, FiArchive } from "react-icons/fi"
import { GrMoney, GrAddCircle } from "react-icons/gr";
//components
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import TabContainer from '../../../components/TabContainer'
import Tab from '../../../components/Tab'
import UserInfo from '../components/UserInfo'
import BuyingInfo from '../components/BuyingInfo'
import SellingInfo from '../components/SellingInfo'
import Following from '../components/Following';

const UserPage = () => {
    const currentUser = useSelector(state => state.userLogin?.userInfo)
    const [user, setUser] = useState({})
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        }
    }, [currentUser])
    return (
        <>
            <Navbar />
            <div className="flex mt-16">
                <TabContainer className="w-[20%]" user={user}>
                    <Tab icon={<FiUser className="text-[30px] mr-3" />} path='/account/info' tabName="Thông Tin" description="Thông tin của bạn" />
                    <Tab icon={<FiArchive className="text-[30px] mr-3" />} path='/account/buying' tabName="Mua" description="Thông tin đấu giá, các đơn hàng của bạn" />
                    <Tab icon={<GrMoney className="text-[30px] mr-3" />} path='/account/selling' tabName="Bán" description="Thông tin hoạt động bán sản phẩm của bạn" />
                    <Tab icon={<GrAddCircle className="text-[30px] mr-3" />} path='/account/following' tabName="Đang theo dõi" description="Thông tin các sản phẩm bạn theo dõi" />
                </TabContainer>
                <Switch>
                    <Route exact path="/account/info">
                        <UserInfo user={user} />
                    </Route>
                    <Route exact path="/account/buying">
                        <BuyingInfo user={user} />
                    </Route>
                    <Route exact path="/account/selling">
                        <SellingInfo user={user} />
                    </Route>
                    <Route exact path="/account/following">
                        <Following user={user} />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default UserPage
