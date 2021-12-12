import { Dispatch } from "redux";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const SET_CURRENT_IGREDIENT = "SET_CURRENT_IGREDIENT";
export const DELETE_IGREDIENT = "DELETE_IGREDIENT";
export const MOVE_IGREDIENT = "MOVE_IGREDIENT";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const url = `https://norma.nomoreparties.space/api/ingredients`;
const orderUrl = "https://norma.nomoreparties.space/api/orders";

export const getIngredients = () => (dispatch: Dispatch) => {
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
type TIngredients = {
  _id: number;
};

export const makeOrder = (ingredients: [], accessToken: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify({
      ingredients: ingredients.map((el: TIngredients) => el._id),
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
