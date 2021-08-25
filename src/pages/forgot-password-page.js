import React, { useState } from 'react'
import { resetPassword } from '../services/auth'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import styles from "./shared.module.css";

const ForgotPassPage = () => {
    const [email, setEmail] = useState('')
    const history = useHistory()


    const handlePasswordRestoration = async () => {
        const result = await resetPassword(email)
        if (result.success) {
            history.push("/reset-password")
        } else {
            alert(result.message)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2 className='mt-30'>Восстановление пароля</h2>
            <div className='mt-6 mb-6 '>
                <EmailInput
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    value={email}
                />
            </div>
            <Button onClick={handlePasswordRestoration}>Восстановить</Button>

            <div className='text_color_inactive mt-25'>Вспомнили пароль? <Link className={`${styles.links} pl-2`} to="/login">Войти</Link></div>
        </div>
    )
}

export default ForgotPassPage
