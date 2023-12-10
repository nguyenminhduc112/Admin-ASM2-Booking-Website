import React from 'react'
import { Outlet, redirect } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { Container } from '@mui/material'
import { checkAuth } from '../utils/auth'

const RootPage = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Container maxWidth="xl" style={{ padding: '20px 10px' }}>
                <Outlet />
            </Container>
        </React.Fragment>
    )
}

export const loaderRoot = function () {
    const isLogin = checkAuth()
    if (!isLogin) {
        return redirect('/login')
    }
    return null
}

export default RootPage