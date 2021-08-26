import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

const ICONS = {
  BurgerIcon: BurgerIcon,
  ListIcon: ListIcon,
  ProfileIcon: ProfileIcon,
};

const MenuItem = ({ children, icon, to }) => {
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

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
const AppHeader = () => {
  return (
    <header>
      <div className={styles.container}>
        <nav>
          <MenuItem to="/" icon="BurgerIcon">
            Конструктор
          </MenuItem>
          <MenuItem to="/orders" icon="ListIcon">
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
