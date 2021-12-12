import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useRouteMatch } from "react-router-dom";
import React, { ReactNode } from "react";
const ICONS: Record<string, any> = {
  BurgerIcon: BurgerIcon,
  ListIcon: ListIcon,
  ProfileIcon: ProfileIcon,
} as const;

interface IMenuItem {
  children: ReactNode,
  icon: string,
  to: string,
}
const MenuItem: React.FC<IMenuItem> = ({ children, icon, to }) => {
  const match = useRouteMatch(to);
  const isActive = match ? match.isExact : false;
  const Icon = ICONS[icon];
  const textColor = isActive ? "" : "text_color_inactive";
  return (
    <Link to={to}>
      <Icon type={isActive ? "primary" : "secondary"} />
      <span className={`${textColor} text text_type_main-default pl-2`}>
        {children}
      </span>
    </Link>
  );
};

const AppHeader = () => {
  return (
    <header>
      <div className={styles.container}>
        <nav>
          <MenuItem to="/" icon="BurgerIcon">
            Конструктор
          </MenuItem>
          <MenuItem to="/feed" icon="ListIcon">
            Лента заказов
          </MenuItem>
        </nav>
        <Link to='/'>
          <Logo />
        </Link>
        <div className={styles.profile}>
          <MenuItem to="/profile" icon="ProfileIcon">
            Личный кабинет
          </MenuItem>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
