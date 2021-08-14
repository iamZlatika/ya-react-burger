import styles from "./burger-constructor.module.css";
import { makeOrder } from "../../services/actions";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from "../burger-constructor-ingredient";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ADD_INGREDIENT,
  DELETE_IGREDIENT,
  MOVE_IGREDIENT,
} from "../../services/actions";

const BurgerConstructor = ({ displayOrderInfo }) => {
  const dispatch = useDispatch();

  const { ingredients, bun } = useSelector((store) => store.order);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch({ type: ADD_INGREDIENT, ingredient });
    },
  });

  const deleteIngredient = (idx) => {
    dispatch({ type: DELETE_IGREDIENT, idx });
  };

  const moveIngredient = (source, target) => {
    dispatch({ type: MOVE_IGREDIENT, source, target });
  };

  const createOrder = () => {
    dispatch(makeOrder(bun ? [bun, ...ingredients, bun] : ingredients))
    displayOrderInfo()
  };
  return (
    <div
      className="ml-10 mt-25 "
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      ref={dropTarget}
    >
      {bun && (
        <div className="pl-14 mt-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div
        className={`${styles.burgeritems} ml-4`}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {ingredients.map((el, index) => {
          return (
            <BurgerConstructorIngredient
              key={`${el.__id}`}
              ingredient={el}
              onClose={() => deleteIngredient(index)}
              onMove={moveIngredient}
              index={index}
            />
          );
        })}
      </div>
      {bun && (
        <div className="pl-14 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={`${styles.submit} mt-10`}>
        <div className={`${styles.total} text text_type_digits-medium mr-8`}>
          {ingredients.reduce(
            (sum, { price }) => sum + price,
            bun ? bun.price * 2 : 0
          )}
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  orderedIngredients: PropTypes.arrayOf(PropTypes.object),
  displayOrderInfo: PropTypes.func,
  createOrder: PropTypes.func,
};

export default BurgerConstructor;
