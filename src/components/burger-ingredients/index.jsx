import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { data } from "../../utils/data.js";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");

  const setIncrement = () => {
    console.log(42);
  };
  return (
    <div className={styles.ingredients}>
      <h2 className="mt-10 mb-5 text text text_type_main-medium">
        Соберите бургер
      </h2>
      <div className={styles.tabbar}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => setCurrent("one")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => setCurrent("two")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => setCurrent("three")}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.items}>
        <div>
          <h3 className="mt-10 mb-6">Булки</h3>
          <ul className={styles.products}>
            {data.map((el) => {
              return (
                el.type === "bun" && (
                  <li key={el._id} className={`${styles.bun} mb-10`}>
                    <Counter count={1} size="default" />
                    <img
                      src={el.image}
                      alt=""
                      className="ml-6 mr-6 mb-1 mt-6"
                    />
                    <div className="mb-1">
                      <span className="mr-2 text text_type_digits-default">
                        {el.price}{" "}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <h4 className="text text_type_main-default">{el.name}</h4>
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div>
          <h3>Соусы</h3>
          <ul className={styles.products}>
            {data.map((el) => {
              return (
                el.type === "sauce" && (
                  <li
                    key={el._id}
                    className={styles.sause}
                    onClick={setIncrement}
                  >
                    <Counter count={1} size="default" />
                    <img src={el.image} alt="img" />
                    <div>
                      <span className="mr-2 text text_type_digits-default">
                        {el.price}{" "}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <h4 className="text text_type_main-default">{el.name}</h4>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

data.propTypes={
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}
export default BurgerIngredients;
