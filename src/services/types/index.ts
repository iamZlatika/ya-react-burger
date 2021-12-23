import { store } from "../../index";
import { TActions } from "../actions";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;


export interface IIngredient {
  _id: number;
  type?: string;
  name: string;
  price: number;
  image: any;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
}
