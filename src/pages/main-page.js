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
    const [isOrderOpen, setOrderOpen] = useState(false);
    const displayIngredientInfo = (ingredient) => {
        history.push(
            `/ingredients/${ingredient._id}`,
            { background: history.location }
        )
    };

    return (
        <>
            <div className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients displayIngredientInfo={displayIngredientInfo} />
                    <BurgerConstructor displayOrderInfo={() => setOrderOpen(true)} />
                </DndProvider>
            </div>
            {isOrderOpen && 
            <Modal onClose={() => setOrderOpen(false)}>
                <OrderDetails />
            </Modal>}
        </>
    )
}

export default MainPage
