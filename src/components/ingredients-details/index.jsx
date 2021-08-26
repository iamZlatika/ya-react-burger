import styles from "./ingredients-details.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const {id} = useParams()
  const ingredient = useSelector(state => state.ingredients?.ingredients?.[id])
  if (!ingredient) {
    return <></>
  }

  return (
    <>
      <div className={`${styles.title} text text_type_main-large mt-10 ml-10`}>
        Детали ингредиента
      </div>
      <div className={styles.ingredient}>
        <img src={ingredient.image} alt="ingredient" className={styles.img} />
        <h3>{ingredient.name}</h3>
        <ul className={`${styles.details} mb-15`}>
          <li className="text text_type_main-default text_color_inactive mr-5">
            <h3>Калории, ккал</h3>{" "}
            <span className="text text_type_digits-default">
              {ingredient.calories}
            </span>
          </li>
          <li className="text text_type_main-default text_color_inactive mr-5">
            <h3>Белки, г</h3>{" "}
            <span className="text text_type_digits-default">
              {ingredient.proteins}
            </span>
          </li>
          <li className="text text_type_main-default text_color_inactive mr-5">
            <h3>Жиры, г</h3>{" "}
            <span className="text text_type_digits-default">
              {ingredient.fat}
            </span>
          </li>
          <li className="text text_type_main-default text_color_inactive">
            <h3>Углеводы, г</h3>{" "}
            <span className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};



export default IngredientDetails;
