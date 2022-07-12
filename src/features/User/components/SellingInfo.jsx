import {useState} from 'react'
//components
import AskList from './AskList'
import SellingPending from './SellingPending'
import SellingHistory from './SellingHistory'

const SellingInfo = () => {
    const [currentTab, setCurrentTab] = useState('ask')
    let body
    const handleCurrentTabChange = (tabName) => {
        setCurrentTab(tabName)
    }
    const getAskList = () => {
        body = <AskList />
    }
   
    if (currentTab === 'ask') {
        getAskList()
    } else if ( currentTab ==='pending' ) {
        body = <SellingPending />
    } else {
        body = <SellingHistory />
    }
    
    return (
        <div className="mt-5 py-4 px-8">
            {/* SellingInfo HEADER */}
            <div className="font-semibold">
                <div className="flex">
                    <div className={`mr-10 cursor-pointer ` + (currentTab === 'ask' ? 'border-b-2 border-red-700' : '')} onClick={() => handleCurrentTabChange('ask')}>Ra giá</div>
                    <div className={`mr-10 cursor-pointer ` + (currentTab === 'pending' ? 'border-b-2 border-red-700' : '')} onClick={() => handleCurrentTabChange('pending')}>Đang xử lý</div>
                    <div className={`mr-10 cursor-pointer ` + (currentTab === 'history' ? 'border-b-2 border-red-700' : '')} onClick={() => handleCurrentTabChange('history')}>Lịch sử</div>
                </div>
            </div>
            {/* SellingInfo HEADER */}
            {body}
        </div>
    )
}

export default SellingInfo
