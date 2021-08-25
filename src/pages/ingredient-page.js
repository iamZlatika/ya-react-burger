import React from 'react'
import { useSelector } from 'react-redux'
import IngredientDetails from '../components/ingredients-details'
import { useRouteMatch } from 'react-router-dom'


const IngredientPage = () => {
    const { ingredients } = useSelector(state => state.ingredients)
    const { params } = useRouteMatch()
    const ingredient = ingredients[params.id]
    return (
        <>
            {ingredient && <IngredientDetails ingredient={ingredient} />}
        </>
    )
}

export default IngredientPage
