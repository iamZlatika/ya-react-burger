import styles from "./order-details.module.css";
import done from "../../images/done.svg";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const order = useSelector((store: any) => store.order);
  return (
    <div className={styles.details}>
      <h2 className={`${styles.title}, text text_type_digits-large mt-30 mb-8`}>
        {order.orderNumber}
      </h2>
      <div className="mb-15 text text_type_digits-default">
        идентификатор заказа
      </div>
      <img src={done} alt="done" />
      <h3 className="mt-15 mb-2 text text_type_digits-small">
        Ваш заказ начали готовить
      </h3>
      <h3 className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </h3>
    </div>
  );
};

export default OrderDetails;
