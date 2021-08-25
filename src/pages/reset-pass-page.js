import React, { useRef, useState } from 'react'
import { updatePassword } from '../services/auth'
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import styles from "./shared.module.css";

const ResetPassPage = () => {

    const [password, setPassword] = useState('')
    const history = useHistory()

    const tokenRef = useRef()

    const hanndlePasswordUpdate = async () => {
        const result = await updatePassword(password, tokenRef.current.value)
        if (result.success) {
            history.push("/login")
        } else {
            alert(result.message)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2 className='mt-30'>Восстановление пароля</h2>
            <div className='mt-6 mb-6'>
                <PasswordInput onChange={(e) => setPassword(e.target.value)} /></div>
            <div className='mb-6'>
                <Input placeholder="Введите код из письма" ref={tokenRef} />
            </div>
            <Button onClick={hanndlePasswordUpdate}>Сохранить</Button>

            <div className='mt-20 text_color_inactive'>Вспомнили пароль? <Link className={`${styles.links} pl-2`} to="/login">Войти</Link></div>
        </div>
    )
}

export default ResetPassPage
