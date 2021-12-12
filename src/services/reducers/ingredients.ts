import { SET_INGREDIENTS, SET_CURRENT_IGREDIENT } from "../actions";
import { IIngredient } from "../types";

export interface IIngredients {
  buns: string[];
  main: string[];
  sauces: string[];
  ingredients: Record<string, IIngredient>;
}

const initialState: IIngredients = {
  buns: [],
  main: [],
  sauces: [],
  ingredients: {},
};

export const ingredientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_INGREDIENTS: {
      return {
        ...state,
        buns: action.ingredients.filter(
          (el: IIngredient) => el.type === "bun"
        ),
        main: action.ingredients.filter(
          (el: IIngredient) => el.type === "main"
        ),
        sauces: action.ingredients.filter(
          (el: IIngredient) => el.type === "sauce"
        ),
        ingredients: Object.fromEntries(
          action.ingredients.map((el: IIngredient) => [el._id, el])
        ),
      };
    }
    case SET_CURRENT_IGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    default: {
      return state;
    }
  }
};
