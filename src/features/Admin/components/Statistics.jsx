import React, {useState, useEffect} from 'react'
//component
import OrderStatistic from './OrderStatistic'
import ProductStatistic from './ProductStatistic'
import RevenueStatistic from './RevenueStatistic'

const Statistics = () => {
    const [currentTab, setCurrentTab] = useState('orders')
    return (
      <div className="mt-5 py-4 px-8 flex-1">
       <h1 className="font-bold text-2xl mb-4">Thống kê</h1>

      <div className="flex justify-between items-center font-semibold mb-4">
          <div className="flex justify-between">
              <div className={`mr-10 cursor-pointer ` + (currentTab === 'orders' ? 'border-b-2 border-red-700' : '')} onClick={() => setCurrentTab('orders')}>Các đơn hàng</div>
              <div className={`mr-10 cursor-pointer ` + (currentTab === 'products' ? 'border-b-2 border-red-700' : '')} onClick={() => setCurrentTab('products')}>Sản phẩm</div>
              <div className={`mr-10 cursor-pointer ` + (currentTab === 'revenue' ? 'border-b-2 border-red-700' : '')} onClick={() => setCurrentTab('revenue')}>Doanh thu</div>
          </div>
      </div>
        {currentTab === 'orders' && <OrderStatistic />}
        {currentTab === 'products' && <ProductStatistic />}
        {currentTab === 'revenue' && <RevenueStatistic />}
  </div>
    )
}

export default Statistics
