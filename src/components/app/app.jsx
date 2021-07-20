import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";

function App() {

  return (
    <div className={styles.App}>
      <AppHeader />
      <div className={styles.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
