import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../actions";


export const useOrder = () => {
    const dispatch = useDispatch()
    const { ingredients, bun } = useSelector((store) => store.order);
    const { accessToken } = useSelector(state => state.auth)
    const createOrder = () => {
        dispatch(makeOrder(bun ? [bun, ...ingredients, bun] : ingredients, accessToken));

    }
    return { createOrder }
}