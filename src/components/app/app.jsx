import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import Modal from "../modal";
import IngredientDetails from "../ingredients-details";
import OrderDetails from "../order-details";

import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";
import { SET_CURRENT_IGREDIENT } from "../../services/actions";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const dispatch = useDispatch();

  const [isIngredientOpen, setIngredientOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

 

  const displayIngredientInfo = (ingredient) => {
    setIngredientOpen(true);
    dispatch({ type: SET_CURRENT_IGREDIENT, currentIngredient: ingredient });
  };

  const hideIngredientsInfo = () => {
    setIngredientOpen(false);
    dispatch({ type: SET_CURRENT_IGREDIENT, currentIngredient: {} });
  };
  const displayOrderInfo = () => {
    setOrderOpen(true);
  };

  return (
    <div className={styles.App}>
      <AppHeader />
    
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients displayIngredientInfo={displayIngredientInfo} />

            <BurgerConstructor displayOrderInfo={displayOrderInfo} />
          </DndProvider>
        </div>
        <Modal isOpen={isIngredientOpen} onClose={hideIngredientsInfo}>
          <IngredientDetails />
        </Modal>
        <Modal isOpen={isOrderOpen} onClose={() => setOrderOpen(false)}>
          <OrderDetails />
        </Modal>
 
    </div>
  );
}

export default App;
