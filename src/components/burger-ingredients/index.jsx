import { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const ingredientTypes = [
  { name: "buns", title: "Булки" },
  { name: "main", title: "Начинки" },
  { name: "sauces", title: "Соусы" },
];
const BurgerIngredients = ({ displayIngredientInfo, id }) => {
  const ingredients = useSelector((store) => store.ingredients);
  const { ingredients: orderedIngredients, bun } = useSelector(
    (store) => store.order
  );

  const [current, setCurrent] = useState("buns");

  const ingredientTypeRefs = {
    buns: useRef(),
    main: useRef(),
    sauces: useRef(),
  };
  const containerRef = useRef();

  const switchTab = (tab) => {
    setCurrent(tab);
    ingredientTypeRefs[tab].current.scrollIntoView({ behavior: "smooth" });
  };

  const updateActiveTab = () => {
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const activeTab = Object.entries(ingredientTypeRefs)
      .map(([name, ref]) => [
        name,
        Math.abs(containerTop - ref.current.getBoundingClientRect().top),
      ])
      .sort((a, b) => a[1] - b[1])[0][0];

    setCurrent(activeTab);
  };

  const countIngredients = (id) => {
    if (bun && bun._id === id) {
      return 2;
    }
    return orderedIngredients.filter((el) => el._id === id).length;
  };

  return (
    <div className={styles.ingredients} ref={containerRef}>
      <h2 className="mt-10 mb-5 text text text_type_main-medium">
        Соберите бургер
      </h2>
      <div className={styles.tabbar}>
        {ingredientTypes.map((el) => (
          <Tab
            key={el.name}
            value={el.name}
            active={current === el.name}
            onClick={() => switchTab(el.name)}
          >
            {el.title}
          </Tab>
        ))}
      </div>

      <div
        className={`${styles.items} pb-30`}
        ref={containerRef}
        onScroll={updateActiveTab}
      >
        {ingredientTypes.map((el) => (
          <div key={el.name} ref={ingredientTypeRefs[el.name]}>
            <h3 className="pt-10 mb-6">{el.title}</h3>
            <ul className={styles.products}>
              {ingredients[el.name].map((ingredient) => (
                <BurgerIngredient
                  {...{ ingredient, displayIngredientInfo }}
                  key={ingredient._id}
                  quantity={countIngredients(ingredient._id)}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  displayOrderInfo: PropTypes.func,
  current: PropTypes.string,
};
export default BurgerIngredients;
