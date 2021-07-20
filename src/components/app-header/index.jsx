import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header>
      <div className={styles.container}>
        <nav>
          <a href="#">
            <BurgerIcon type="primary" />
            <span className="pl-2">Конструктор</span>
          </a>
          <a href="#">
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive pl-2">
              Лента заказов
            </span>
          </a>
        </nav>

        <Logo />

        <div className={styles.profile}>
          <a href="#">
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
