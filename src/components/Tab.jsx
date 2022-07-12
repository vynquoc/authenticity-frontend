import React from 'react'
import { Link } from 'react-router-dom'
import {  useRouteMatch } from 'react-router'


const Tab = ({icon, tabName, description, path}) => {
    let match = useRouteMatch({
        path: path
    })
    return (
        <Link to={path} className={`flex items-center py-4 hover:bg-gray-300 ` + (match ? 'border-r-4 border-red-700 duration-300' : '') }>
            {icon}
            <div>
                <p className="font-semibold text-sm">{tabName}</p>
                <p className="text-gray-500 text-xs">{description}</p>
            </div>
        </Link>
    )
}

export default Tab
