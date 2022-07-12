import React, { useEffect, useState } from 'react'
import adminApi from '../../../api/adminApi'

import Chart from "react-apexcharts"

const OrderStatistic = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            labels: [],
            legend: {
                position: 'bottom'
            },
            title: {
                text: 'Tổng đơn hàng',
                align: 'center',
                style: {
                    fontFamily: 'Monospace',
                    fontSize: '18px'
                }
            }
        }
    })

    const getOrderStatistics = async () => {
        try {
            const response = await adminApi.getOrderStatistics()
            let series = []
            let labels = []
            for (const dataObj of response.data) {
                series.push(dataObj.count)
                labels.push(dataObj._id.toUpperCase())
            }
       
            setChartData({
                series: series,
                options: {
                    labels: labels
                },
               
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
     getOrderStatistics()
    }, [])
  
    return (
        <div>
           <Chart options={chartData.options} series={chartData.series} type="pie" width="300" title/>
        </div>
    )
}

export default OrderStatistic
