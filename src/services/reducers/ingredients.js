import { SET_INGREDIENTS, SET_CURRENT_IGREDIENT } from '../actions'
const initialState = {
    buns: [],
    main: [],
    sauces: [],
    ingredients: {}
}

export const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INGREDIENTS: {
            return {
                ...state,
                buns: action.ingredients.filter(el => el.type === 'bun'),
                main: action.ingredients.filter(el => el.type === 'main'),
                sauces: action.ingredients.filter(el => el.type === 'sauce'),
                ingredients: Object.fromEntries(action.ingredients.map(el => [el._id, el]))
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