import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"
import adminApi from '../../../api/adminApi'

const RevenueStatistic = () => {
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Doanh thu',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 12, 66, 65]
          }],
        options: {
            chart: {
              type: 'bar',
             
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            },
            yaxis: {
              title: {
                text: '$ ',
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$ " + val
                }
              }
            }
          },
    })

    const getRevenueStatistics = async () => {
        try {
            const response = await adminApi.getRevenueStatistics()
            console.log(response)
            let series = []
            let labels = []
            let months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
            
            for (const obj of response.data) {
              series.push(obj.revenue)
              labels.push(obj.month)
              
            }
           
            setChartData({
                ...chartData,
                series: [{name: 'Doanh thu', data: series}],
                options: {
                    ...chartData.options,
                    xaxis: {
                        categories: labels
                    }
                }
            })
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getRevenueStatistics()
    }, [])
    return (
        <div className="h-[300px]">
            <Chart series={chartData.series} options={chartData.options} type="bar" />
            
        </div>
    )
}

export default RevenueStatistic
