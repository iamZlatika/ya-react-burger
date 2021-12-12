import React from "react";
import styles from "./feed.module.css";

const Feed = () => {
  return (
    <>
    <h2>Лента заказов</h2>
      <div className={styles.feed_wrapper}>
        <div className={styles.items}>
          <div>
            <div>
              <h3>#/034535</h3>
              <span>Сегодня, 16:20 i-GMT+3</span>
            </div>
            <h2>Какой-то бургер</h2>
            <div>
              <div>иконки</div>
              <div>480</div>
            </div>
          </div>
        </div>
        <div className="orders">
          <div className={styles.orders_table}>
            <div className={styles.ready_orders}>
              <h3>Готовы</h3>
              <ul>
                <li>034533</li>
                <li>034532</li>
                <li>034560</li>
                <li>034527</li>
              </ul>
            </div>
            <div className={styles.in_process}>
              <h3>В работе</h3>
              <ul>
                <li>034538</li>
                <li>034541</li>
                <li>034542</li>
              </ul>
            </div>
          </div>
          <div className={styles.total}>
            <div>28752</div>
          </div>
          <div className={styles.today}>
            <div>138</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
