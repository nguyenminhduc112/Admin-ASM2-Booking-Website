import React from 'react'
import styles from './FormLogin.module.css'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { authAction } from '../../store/reducers/auth'
import { useNavigate } from 'react-router-dom'
import { setIsAdmin, setIsAuthentication } from '../../utils/auth'
const FormLogin = () => {
    const dispatch = useDispatch()
    const router = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm()
    // Xử lý đăng nhập
    const FetchLogin = async (data) => {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/auth/signinAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.status === 404) {
            setError('password', {
                message: 'Emal and Password are incorrect'
            })
        }

        if (response.status === 200) {
            const user = await response.json()
            return user
        }

    }
    // Xử lý submit form
    const handlerSubmitForm = (data) => {
        FetchLogin(data)
            .then(user => {
                dispatch(authAction.login(user.isAdmin))
                setIsAuthentication()
                setIsAdmin()
                router('/')
            })
            .catch(err => console.log(err))
    }
    // Xử lý khi submit error
    const handleError = (error) => {
        setValue('password', '')
    }
    return (
        <React.Fragment>
            <div className={styles.wrapperForm}>
                <form className={styles.form} onSubmit={handleSubmit(handlerSubmitForm, handleError)}>
                    <h1 className={styles.title}>Login Admin Page</h1>
                    <div className={styles.inputGroup}>
                        <input type="text" name="email" id="email" placeholder='EMAIL' {...register('email', {
                            required: "Email is empty",
                            pattern: {
                                value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                                message: "Invalid email"
                            }
                        })} className={styles.input} />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" name="password" id="password" placeholder='PASSWORD' {...register('password', {
                            required: "Password is empty"
                        })} className={styles.input} />
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button type='submit' className={styles.btnSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default FormLogin
