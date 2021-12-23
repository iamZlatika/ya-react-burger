import { Dispatch } from "redux";
import { IIngredient, AppThunk } from "../types";


export const SET_INGREDIENTS: "SET_INGREDIENTS" = "SET_INGREDIENTS";
export const SET_ORDER_NUMBER: "SET_ORDER_NUMBER" = "SET_ORDER_NUMBER";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const SET_CURRENT_INGREDIENT: "SET_CURRENT_IGREDIENT" =
  "SET_CURRENT_IGREDIENT";
export const DELETE_IGREDIENT: "DELETE_IGREDIENT" = "DELETE_IGREDIENT";
export const MOVE_IGREDIENT: "MOVE_IGREDIENT" = "MOVE_IGREDIENT";
export const LOGIN: "LOGIN" = "LOGIN";
export const LOGOUT: "LOGOUT" = "LOGOUT";

const url = `https://norma.nomoreparties.space/api/ingredients`;
const orderUrl = "https://norma.nomoreparties.space/api/orders";

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS;
  ingredients: [];
}
export interface ISetOrderNumber {
  readonly type: typeof SET_ORDER_NUMBER;
  orderNumber: number;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  ingredient: { type: string };
}
export interface ISetCurrentIngredients {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  currentIngredient: any;
}
export interface IDeleteIngredients {
  readonly type: typeof DELETE_IGREDIENT;
  idx: number;
}
export interface IMoveIngredients {
  readonly type: typeof MOVE_IGREDIENT;
  source: number;
  target: number;
}
export interface ILogin {
  readonly type: typeof LOGIN;
}
export interface ILogout {
  readonly type: typeof LOGOUT;
}

export type TActions =
  | ISetIngredients
  | ISetOrderNumber
  | IAddIngredient
  | ISetCurrentIngredients
  | IDeleteIngredients
  | IMoveIngredients
  | ILogin
  | ILogout;

export const getIngredients: AppThunk = () => (dispatch: Dispatch) => {
  const loadData = async () => {
    const res = await fetch(url);
    try {
      if (res.ok) {
        dispatch({
          type: SET_INGREDIENTS,
          ingredients: (await res.json()).data,
        });
      }
    } catch (err) {
      console.log(`Error status is ${res.status}`, err);
    }
  };
  loadData();
};

export const makeOrder  : AppThunk= (
  ingredients: IIngredient[],
  accessToken: string
) => async (dispatch: Dispatch): Promise<void> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify({
      ingredients: ingredients.map((el) => el._id),
    }),
  };
  const res = await fetch(orderUrl, options);

  try {
    if (res.ok) {
      dispatch({
        type: SET_ORDER_NUMBER,
        orderNumber: (await res.json()).order.number,
      });
    }
  } catch (err) {
    console.log(`Error status is ${res.status}`, err);
  }
};
