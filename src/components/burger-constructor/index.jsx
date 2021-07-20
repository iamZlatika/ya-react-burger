import { data } from "../../utils/data.js";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerConstructor = () => {
  return (
    <div
      className="ml-10 mt-25 "
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <div className="pl-14 mt-4">
        {
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        }
      </div>
      <div
        className={`${styles.burgeritems} ml-4`}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {data.map((el, idx) => {
          return (
            idx !== 0 &&
            el.type !== "bun" && (
              <div>
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
      <div className={`${styles.submit} mt-10`}>
        <div className={`${styles.total} text text_type_digits-medium mr-8`}>
          {data.reduce((sum, { price }) => sum + price, 0)}
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
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

Button.propTypes = {
  type: PropTypes.string | undefined,
  size: PropTypes.string | undefined,
};

ConstructorElement.propTypes={
  type: PropTypes.string | undefined,
  isLocked: PropTypes.bool | undefined,
  text: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}




DragIcon.propTypes={
  type: PropTypes.string
}
CurrencyIcon.propTypes={
  type: PropTypes.string
}
export default BurgerConstructor;
