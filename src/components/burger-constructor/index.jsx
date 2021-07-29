import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data, displayOrderInfo }) => {
  return (
    data.length && (
      <div
        className="ml-10 mt-25 "
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div className="pl-14 mt-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div
          className={`${styles.burgeritems} ml-4`}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {data.map((el, idx) => {
            return (
              idx !== 0 &&
              el.type !== "bun" && (
                <div key={el._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className="pl-14 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`${styles.submit} mt-10`}>
          <div className={`${styles.total} text text_type_digits-medium mr-8`}>
            {data.reduce((sum, { price }) => sum + price, 0)}
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={displayOrderInfo}>
            Оформить заказ
          </Button>
        </div>
      </div>
    )
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  displayOrderInfo: PropTypes.func.isRequired,
};

export default BurgerConstructor;
