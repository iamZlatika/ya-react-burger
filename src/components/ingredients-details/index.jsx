import styles from "./ingredients-details.module.css";
import Modal from "../modal";
import PropTypes from "prop-types";

const IngredientDetails = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div
          className={`${styles.title} text text_type_main-large mt-10 ml-10`}
        >
          Детали ингредиента
        </div>
        <div className={styles.ingredient}>
          <img src={data.image} alt="ingredient" className={styles.img} />
          <h3>{data.name}</h3>
          <ul className={`${styles.details} mb-15`}>
            <li className="text text_type_main-default text_color_inactive mr-5">
              <h3>Калории, ккал</h3>{" "}
              <span className="text text_type_digits-default">
                {data.calories}
              </span>
            </li>
            <li className="text text_type_main-default text_color_inactive mr-5">
              <h3>Белки, г</h3>{" "}
              <span className="text text_type_digits-default">
                {data.proteins}
              </span>
            </li>
            <li className="text text_type_main-default text_color_inactive mr-5">
              <h3>Жиры, г</h3>{" "}
              <span className="text text_type_digits-default">{data.fat}</span>
            </li>
            <li className="text text_type_main-default text_color_inactive">
              <h3>Углеводы, г</h3>{" "}
              <span className="text text_type_digits-default">
                {data.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default IngredientDetails;
