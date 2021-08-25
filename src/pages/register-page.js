import React, { useRef, useState } from 'react'
import { registerUser } from '../services/auth'
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import styles from "./shared.module.css";

const RegisterPage = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const nameRef = useRef()
    const history = useHistory()


    const handleUserRegistration = async () => {
        const name = nameRef.current.value
        const result = await registerUser(email, name, password)
        if (result.success) {
            history.push("/")
        } else {
            alert(result.message)
        }

    }
    return (
        <div className={styles.wrapper}>

            <h2 className="mt-30" >Регистрация</h2>
            <div className='mt-6'>
                <Input placeholder="Имя" type="string" ref={nameRef} /></div>
            <div className='mt-6'>
                <EmailInput onChange={(e) => setEmail(e.target.value)} /></div>
            <div className='mt-6 mb-6'>
                <PasswordInput onChange={(e) => setPassword(e.target.value)} /></div>

            <Button onClick={handleUserRegistration}>Зарегистрироваться</Button>
            <div className='mt-15 text_color_inactive'>Вы зарегистрированы? <Link  className={`${styles.links} pl-2`}  to="/login">Войти</Link></div>

        </div>
    )
}

export default RegisterPage
