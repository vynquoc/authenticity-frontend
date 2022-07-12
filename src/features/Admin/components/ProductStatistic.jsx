import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"
import adminApi from '../../../api/adminApi'

const ProductStatistic = () => {
    const [type, setType] = useState('category')
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            labels: [],
            legend: {
                position: 'bottom'
            },
            title: {
                text: 'Tổng sản phẩm',
                align: 'center',
                style: {
                    fontFamily: 'Monospace',
                    fontSize: '18px'
                }
            }
        }
    })
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }
    const getProductStatistics = async () => {
        try {
            const response = await adminApi.getProductStatistics(type)
       
            let series = []
            let labels = []
            for (const dataObj of response.data) {
                series.push(dataObj.count)
                labels.push(dataObj.type.toUpperCase())
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
        getProductStatistics()
    }, [type])
    return (
        <div>
            <div className="border-[1px] w-[fit-content] p-2">
                <div className="flex items-baseline mb-2">
                    <p className="text-sm">Thống kê theo</p>
                    <select className="outline-none text-sm font-semibold cursor-pointer" onChange={handleTypeChange}>
                        <option value="category">Danh mục</option>
                        <option value="brand">Thương hiệu</option>
                    </select>
                </div>
                <p className="text-sm">Tổng sản phẩm: <span className="font-semibold">{chartData.series.reduce((sum, num) => sum + num, 0)}</span></p>
                    <Chart options={chartData.options} series={chartData.series} type="pie" width="400" title/>
            </div>
        </div>
    )
}

export default ProductStatistic
