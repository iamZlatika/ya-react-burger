import { SET_ORDER_NUMBER, ADD_INGREDIENT, DELETE_IGREDIENT, MOVE_IGREDIENT, TActions } from "../actions";


interface IOrder {
    orderNumber: string,
    ingredients: [],
    bun: undefined | {}
} 

const initialState : IOrder= {
    orderNumber: '',
    ingredients: [],
    bun: undefined
}


let __id = 0
export const orderReducer = (state = initialState, action : TActions)=> {
    switch (action.type) {
        case SET_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                ingredients: [],
                bun: undefined,
            }
        }
        case ADD_INGREDIENT: {

            return action.ingredient.type === 'bun'
                ? {
                    ...state,
                    bun: action.ingredient
                }
                : {
                    ...state,
                    ingredients: [...state.ingredients, { ...action.ingredient, __id: __id++ }]
                }
        }
        case DELETE_IGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter((_, idx) => idx !== action.idx)
            }
        }
        case MOVE_IGREDIENT: {
            const ingredient = state.ingredients[action.source]
            let ingredients = state.ingredients.filter((_, i) => i !== action.source)
            if (action.target === 0) {
                ingredients = [ingredient, ...ingredients]
            } else {
                ingredients.splice(action.target, 0, ingredient)
            }
            return {
                ...state,
                ingredients
            }
        }
        default: {
            return state
        }
    }
}