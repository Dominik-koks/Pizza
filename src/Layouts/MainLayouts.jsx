import React, { Children } from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'

function MainLayouts() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayouts