import React, { useState } from 'react'
import { login } from '../services/auth'
import { LOGIN } from '../services/actions'
import { useDispatch } from 'react-redux';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import styles from "./shared.module.css";

const LoginPage : React.FC= () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()
    const history = useHistory<any>()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await login(email, password)

        if (result.success) {
            dispatch({ type: LOGIN })
            history.push(history?.location?.state?.from || '/')
        } else {
            alert(result.message)
        }
    }

    return (
        <form 
        className={styles.wrapper}
        onSubmit={handleLogin}>
            <h2 className='mt-30'>Вход</h2>

            <div className='mt-6'>
                <EmailInput 
                onChange={(e) => setEmail(e.target.value)} 
                name='email' 
                value={email} 
                />
                </div>
            <div className='mt-6 mb-6'>
                <PasswordInput 
                onChange={(e) => setPassword(e.target.value)} 
                name='password' 
                value={password} 
                />
                </div>
            <Button>Войти</Button>

            <div className='mt-25 text_color_inactive'>Вы - новый пользователь?<Link className={`${styles.links} pl-2`} to="/register">Зарегистрироваться</Link></div>
            <div className='mt-4 text_color_inactive'>Забыли пароль? <Link className={`${styles.links} pl-2`} to="/forgot-password">Восстановить пароль</Link></div>
        </form>
    )
}

export default LoginPage
