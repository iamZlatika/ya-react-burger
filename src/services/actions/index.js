export const SET_INGREDIENTS = "SET_INGREDIENTS"
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const SET_CURRENT_IGREDIENT = 'SET_CURRENT_IGREDIENT'
export const DELETE_IGREDIENT = 'DELETE_IGREDIENT'
export const MOVE_IGREDIENT = 'MOVE_IGREDIENT'

const url = `https://norma.nomoreparties.space/api/ingredients`;
const orderUrl = "https://norma.nomoreparties.space/api/orders";



export const getIngredients = () => dispatch => {
    const loadData = async () => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }
        try {
            dispatch({
                type: SET_INGREDIENTS,
                ingredients: (await res.json()).data
            })

        } catch (err) {
            console.log("Error happened during fetching!", err);
        }
    };
    loadData();
}

export const makeOrder =(ingredients)=> async dispatch =>{
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients.map((el) => el._id),
        }),
      };
      const res = await fetch(orderUrl, options);
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }
      try {
        dispatch({type: SET_ORDER_NUMBER, orderNumber:  (await res.json()).order.number});
      } catch (err) {
        console.log("Error happened during fetching!", err);
      }
}