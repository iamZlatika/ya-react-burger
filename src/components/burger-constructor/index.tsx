import styles from "./burger-constructor.module.css";
import { useOrder } from "../../services/orders";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from "../burger-constructor-ingredient";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import {
  ADD_INGREDIENT,
  DELETE_IGREDIENT,
  MOVE_IGREDIENT,
} from "../../services/actions";
import { IIngredient } from "../../services/types"

interface IBurgerConstructor {
  displayOrderInfo: () => void
}


const BurgerConstructor: React.FC<IBurgerConstructor> = ({ displayOrderInfo }) => {
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

  const deleteIngredient = (idx: number) => {
    dispatch({ type: DELETE_IGREDIENT, idx });
  };

  const moveIngredient = (source: number, target: number) => {
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

  const calcTotal = () => ingredients.reduce(
    (sum: number, { price }) => sum + price,
    bun ? bun.price * 2 : 0
  )

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
              key={`${el._id}`}
              ingredient={ingredients[index]}
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
          {calcTotal()}
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={handleOrderCreation}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};



export default BurgerConstructor;
