import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BurgerIngredients from "../components/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor";
import Modal from "../components/modal";
import IngredientDetails from "../components/ingredients-details";
import OrderDetails from "../components/order-details";


import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styles from "../components/app/app.module.css";

const MainPage = () => {

    const history = useHistory()

    const [isIngredientOpen, setIngredientOpen] = useState(false);
    const [isOrderOpen, setOrderOpen] = useState(false);
    const [ingredient, setIngredient] = useState({})



    const displayIngredientInfo = (ingredient) => {
        setIngredientOpen(true);
        setIngredient(ingredient)
   
        window.history.pushState(null, "", `/ingredients/${ingredient._id}`
        );
    };

    const hideIngredientsInfo = () => {
        setIngredientOpen(false);
        setIngredient({})
       
        console.log(history)
        window.history.pushState(history.state, "", history.location.pathname);
    };
    const displayOrderInfo = () => {
        setOrderOpen(true);
    };

    return (
        <>
            <div className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients displayIngredientInfo={displayIngredientInfo} />
                    <BurgerConstructor displayOrderInfo={displayOrderInfo} />
                </DndProvider>
            </div>
            <Modal isOpen={isIngredientOpen} onClose={hideIngredientsInfo}>
                <IngredientDetails ingredient={ingredient} />
            </Modal>
            <Modal isOpen={isOrderOpen} onClose={() => setOrderOpen(false)}>
                <OrderDetails />
            </Modal>
        </>
    )
}

export default MainPage
