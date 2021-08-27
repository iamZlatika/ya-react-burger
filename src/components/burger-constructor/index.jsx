import styles from "./burger-constructor.module.css";
import { useOrder } from "../../services/orders";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from "../burger-constructor-ingredient";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import {
  ADD_INGREDIENT,
  DELETE_IGREDIENT,
  MOVE_IGREDIENT,
} from "../../services/actions";

const BurgerConstructor = ({ displayOrderInfo }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { ingredients, bun } = useSelector((store) => store.order);
  const { loggedIn } = useSelector((state) => state.auth);
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

  const { createOrder } = useOrder();

  const handleOrderCreation = () => {
    if (!loggedIn) {
      history.push("/login");
    } else {
      createOrder();
      displayOrderInfo();
    }
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
        <Button type="primary" size="medium" onClick={handleOrderCreation}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  displayOrderInfo: PropTypes.func.isRequired,
};

export default BurgerConstructor;
