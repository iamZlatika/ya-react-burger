import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../actions";


export const useOrder = () => {
    const dispatch = useDispatch()
    const { ingredients, bun } = useSelector((store: any) => store.order);
    const { accessToken } = useSelector((state : any) => state.auth)
    const createOrder = () => {
        dispatch(makeOrder(bun ? [bun, ...ingredients, bun] : ingredients, accessToken));

    }
    return { createOrder }
}