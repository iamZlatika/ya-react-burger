import React, { useState, useEffect, useCallback } from 'react'
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useUserData } from '../services/auth';
import { logout } from '../services/auth'
import { LOGOUT } from '../services/actions'
import { useDispatch } from 'react-redux';
import {
    useHistory
} from "react-router-dom";
import styles from "./shared.module.css";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const { getUserData, setUserData } = useUserData()

    const loadUserData = useCallback(async () => {
        const { name, email } = await getUserData()
        setName(name)
        setEmail(email)
    }, [getUserData]
    )

    const updateName = async (name) => {
        setName(name)
        setUserData({ name })
    }

    const handleLogout = async () => {
        const result = await logout()
        if (result.success) {
            dispatch({ type: LOGOUT })
            history.replace({ pathname: '/login' })
        }
        else {
            alert(result.message)
        }
    }
    useEffect(() => {
        loadUserData()
    }, [loadUserData])

    return (
        <div className={`${styles.wrapper} pt-30`}>
            <div className={styles.container}>
                <div className={`${styles.left_side} mr-15`}>
                    <div className={`${styles.profile_items} text text_type_main-medium`}>Профиль</div>
                    <div className={`${styles.profile_items} text text_type_main-medium  text_color_inactive`}>История заказов</div>
                    <div onClick={handleLogout} className={`${styles.profile_items} text text_type_main-medium  text_color_inactive`}>Выход</div>
                    <div className="mt-20 text_color_inactive">В этом разделе вы можете
                        изменить свои персональные данные</div>
                </div>
                <div>
                    <div>
                        <Input value={name} placeholder="Имя" icon="EditIcon" onChange={(e) => updateName(e.target.value)} /></div>
                    <div className="mt-6 text_color_inactive">
                        <Input value={email} placeholder="Логин" icon="EditIcon" onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className='mt-6'>
                        <PasswordInput value={password} name="password" onChange={(e) => setPassword(e.target.value)} /></div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
