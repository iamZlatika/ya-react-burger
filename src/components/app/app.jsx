import { useEffect, useCallback } from "react";
import AppHeader from "../app-header";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";
import ProtectedRoute from "../protected-route";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  MainPage,
  RegisterPage,
  LoginPage,
  IngredientPage,
  ResetPassPage,
  NotFoundPage,
  ProfilePage,
  ForgotPassPage,
} from "../../pages";

function App() {
  const dispatch = useDispatch();
  
  const lalal = useCallback(async () => {
    dispatch(getIngredients());
  }, [dispatch]);
  useEffect(() => {
    lalal();
  }, [lalal]);

  return (
    <>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            <MainPage />
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
      </Router>
    </>
  );
}

export default App;
