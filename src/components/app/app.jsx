import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import IngredientDetails from "../ingredients-details";
import OrderDetails from "../order-details";

const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [data, setData] = useState([]);

  const [isIngredientOpen, setIngredientOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);

  const [currentIngredient, setCurrentIngredient] = useState({});

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log("Error happened during fetching!", err);
      });
  }, []);

  const displayIngredientInfo = (ingredient) => {
    setIngredientOpen(true);
    setCurrentIngredient(ingredient);
  };
  const displayOrderInfo = () => {
    setOrderOpen(true);
  };

  return (
    <div className={styles.App}>
      <AppHeader />
      <div className={styles.content}>
        <BurgerIngredients
          data={data}
          displayIngredientInfo={displayIngredientInfo}
        />
        <BurgerConstructor data={data} displayOrderInfo={displayOrderInfo} />
      </div>
      <div className={styles.modal}>
        <IngredientDetails
          data={currentIngredient}
          isOpen={isIngredientOpen}
          onClose={() => setIngredientOpen(false)}
        />
        <OrderDetails
          isOpen={isOrderOpen}
          onClose={() => setOrderOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
