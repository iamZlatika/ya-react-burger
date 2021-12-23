import React, { useEffect } from "react";
import AppHeader from "../app-header";
import { useDispatch,  } from "react-redux";
import { getIngredients } from "../../services/actions";
import ProtectedRoute from "../protected-route";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import {
  MainPage,
  RegisterPage,
  LoginPage,
  IngredientPage,
  ResetPassPage,
  NotFoundPage,
  ProfilePage,
  ForgotPassPage,
  FeedPage,
} from "../../pages";
import { LOGIN } from "../../services/actions";
import { isLoggedIn } from "../../services/auth";
import { Location } from "history"
import Modal from "../modal";
import IngredientDetails from "../ingredients-details";



const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<{ background?: Location }>();
  const history = useHistory();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch({ type: LOGIN })
    }
  }, [dispatch]);

  const background = history?.action === "PUSH" && location?.state?.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassPage />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/forgot-password" exact>
          <ForgotPassPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      <Route
        path="/ingredients/:id"
        children={
          background && (
            <Modal
              onClose={() => {
                history.goBack();
              }}
            >
              <IngredientDetails />
            </Modal>
          )
        }
      />
    </>
  );
}

export default App;
