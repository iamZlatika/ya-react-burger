import { SET_INGREDIENTS, SET_CURRENT_IGREDIENT } from '../actions'
const initialState = {
    buns: [],
    main: [],
    sauces: [],
    currentIngredient: {}
}

export const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INGREDIENTS: {
            return {
                ...state,
                buns: action.ingredients.filter(el => el.type === 'bun'),
                main: action.ingredients.filter(el => el.type === 'main'),
                sauces: action.ingredients.filter(el => el.type === 'sauce'),
            }
        }
        case SET_CURRENT_IGREDIENT: {
            return {
                ...state,
                currentIngredient: action.currentIngredient
            }
        }
        default: {
            return state
        }
    }
}