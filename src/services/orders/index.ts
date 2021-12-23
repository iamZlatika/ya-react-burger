import { useDispatch } from "react-redux";
import { makeOrder } from "../actions";
import { useSelector } from "../hooks";


export const useOrder = () => {
    const dispatch = useDispatch()
    const { ingredients, bun } = useSelector((store) => store.order);
    const { accessToken } = useSelector((state) => state.auth)
    const createOrder = () => {
        dispatch(makeOrder(bun ? [bun, ...ingredients, bun] : ingredients, accessToken));

    }
    return { createOrder }
}