import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data, displayIngredientInfo }) => {
  const [current, setCurrent] = useState("one");

  console.log(data);
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
            {data.map((ingredient) => {
              return (
                ingredient.type === "bun" && (
                  <li
                    key={ingredient._id}
                    className={`${styles.bun} mb-10`}
                    onClick={() => displayIngredientInfo(ingredient)}
                  >
                    <Counter count={1} size="default" />
                    <img
                      src={ingredient.image}
                      alt=""
                      className="ml-6 mr-6 mb-1 mt-6"
                    />
                    <div className="mb-1">
                      <span className="mr-2 text text_type_digits-default">
                        {ingredient.price}{" "}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <h4 className="text text_type_main-default">
                      {ingredient.name}
                    </h4>
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div>
          <h3>Соусы</h3>
          <ul className={styles.products}>
            {data.map((ingredient) => {
              return (
                ingredient.type === "sauce" && (
                  <li
                    onClick={() => displayIngredientInfo(ingredient)}
                    key={ingredient._id}
                    className={styles.sause}
                  >
                    <Counter count={1} size="default" />
                    <img src={ingredient.image} alt="img" />
                    <div>
                      <span className="mr-2 text text_type_digits-default">
                        {ingredient.price}{" "}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <h4 className="text text_type_main-default">
                      {ingredient.name}
                    </h4>
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  displayOrderInfo: PropTypes.func,
};
export default BurgerIngredients;
