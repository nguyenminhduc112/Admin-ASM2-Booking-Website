import React from 'react'
import FormLogin from '../components/login/FormLogin'
import { checkAuth } from '../utils/auth'
import { redirect } from 'react-router-dom'

const LoginPage = () => {
    return (
        <React.Fragment>
            <FormLogin />
        </React.Fragment>
    )
}

export const loaderLogin = function () {
    const isLogin = checkAuth()
    if (isLogin) {
        return redirect('/')
    }
    return null
}

export default LoginPage
