import React, { useState } from 'react'
import { updatePassword } from '../services/auth'
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory, useLocation, Redirect
} from "react-router-dom";
import styles from "./shared.module.css";

const ResetPassPage = () => {

    const [password, setPassword] = useState('')
    const [token, setCode] = useState('')
    const history = useHistory()


    const hanndlePasswordUpdate = async (e) => {
        e.preventDefault()
        const result = await updatePassword(password, token)
        if (result.success) {
            history.push("/login")
        } else {
            alert(result.message)
        }
    }
    if (!history?.location?.state?.from) {
        return <Redirect to="/login" />
    }
    return (
        <>

            <form
                className={styles.wrapper}
                onSubmit={hanndlePasswordUpdate}>

                <h2 className='mt-30'>Восстановление пароля</h2>
                <div className='mt-6 mb-6'>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name={password}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        placeholder="Введите код из письма"
                        onChange={(e) => setCode(e.target.value)}
                        value={token}
                    />
                </div>
                <Button>Сохранить</Button>

                <div className='mt-20 text_color_inactive'>Вспомнили пароль? <Link className={`${styles.links} pl-2`} to="/login">Войти</Link></div>
            </form>
        </>
    )
}

export default ResetPassPage
