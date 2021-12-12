import styles from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../services/types"
import { useDrag } from "react-dnd";




interface TBurgerIngredient {
  displayIngredientInfo: (ingredient: IIngredient) => void,
  quantity: number,
  ingredient: IIngredient
}

const BurgerIngredient: React.FC<TBurgerIngredient> = ({ ingredient, displayIngredientInfo, quantity }) => {
  const [, ref] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  return (
    <li
      key={ingredient._id}
      className={`${styles.bun} mb-10`}
      onClick={() => displayIngredientInfo(ingredient)}
      ref={ref}
      style={{ cursor: "pointer" }}
    >
      {quantity > 0 && <Counter count={quantity} size="default" />}
      <img src={ingredient.image} alt={ingredient.name} className="ml-6 mr-6 mb-1 mt-6" />
      <div className="mb-1">
        <span className="mr-2 text text_type_digits-default">
          {ingredient.price}{" "}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className="text text_type_main-default">{ingredient.name}</h4>
    </li>
  );
};



export default BurgerIngredient;
