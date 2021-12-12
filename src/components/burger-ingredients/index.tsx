import React, { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from '../../services/types'

interface ITab {
  name: string
  title: string
}

const ingredientTypes: ITab[] = [
  { name: "buns", title: "Булки" },
  { name: "main", title: "Начинки" },
  { name: "sauces", title: "Соусы" },
];

interface IBurgerIngredients {
  displayIngredientInfo: (ingredient: IIngredient) => void
}
const BurgerIngredients: React.FC<IBurgerIngredients> = ({ displayIngredientInfo }) => {
  const ingredients = useSelector<any, Record<string, IIngredient[]>>(store => store.ingredients);
  const { ingredients: orderedIngredients, bun } = useSelector<any, {ingredients: IIngredient[], bun: IIngredient}>(
    store => store.order
  );

  const [currentTab, setCurrentTab] = useState<string>("buns");

  const ingredientTypeRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    buns: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
    sauces: useRef<HTMLDivElement>(null),
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    ingredientTypeRefs[tab]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateActiveTab = () => {
    const containerTop = containerRef?.current?.getBoundingClientRect().top || 0;
    const activeTab = Object.entries(ingredientTypeRefs)
      .map(([name, ref]): [string, number] => [
        name,
        ref?.current ? Math.abs(containerTop - ref.current.getBoundingClientRect().top) : 0,
      ])
      .sort((a, b) => a[1] - b[1])[0][0];

    setCurrentTab(activeTab);
  };

  const countIngredients = (id: number) => {
    if (bun && bun._id === id) {
      return 2;
    }
    return orderedIngredients.filter(({ _id }) => _id === id).length;
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
            active={currentTab === el.name}
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


export default BurgerIngredients;
