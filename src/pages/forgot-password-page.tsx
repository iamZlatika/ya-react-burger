import React, { useState } from "react";
import { resetPassword } from "../services/auth";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./shared.module.css";

const ForgotPassPage: React.FC= () => {
  const [email, setEmail] = useState<string>("");
  const history = useHistory();
  const location = useLocation();

  const handlePasswordRestoration = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await resetPassword(email);
    if (result.success) {
      history.push({
        pathname: "/reset-password",
        state: {
          from: location.pathname,
        },
      });
    } else {
      alert(result.message);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handlePasswordRestoration}>
      <h2 className="mt-30">Восстановление пароля</h2>
      <div className="mt-6 mb-6 ">
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />
      </div>
      <Button>Восстановить</Button>

      <div className="text_color_inactive mt-25">
        Вспомнили пароль?{" "}
        <Link className={`${styles.links} pl-2`} to="/login">
          Войти
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassPage;
