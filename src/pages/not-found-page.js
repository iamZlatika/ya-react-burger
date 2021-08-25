import styles from "./shared.module.css";

const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className='mt-30'>Упс!</h2>
            <div className='mt-6'>Страница не найдена</div>
        </div>
    )
}

export default NotFoundPage
