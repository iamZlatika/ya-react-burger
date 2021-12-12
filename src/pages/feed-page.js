import React from 'react'
import styles from "./shared.module.css";
import Feed from '../components/feed';

const FeedPage = () => {
    return (
        <div className={styles.wrapper}>
            <Feed />
        </div>
    )
}

export default FeedPage
