import React from "react"
import {AiOutlineMinus} from "react-icons/ai"
import {AiOutlinePlus} from "react-icons/ai"
import { useAppDispatch } from "../redux/hooks"
import {increaseQty, decreaseQty} from "../redux/features/cart/cartSlice"

interface Props{
    id: string
    url: string,
    name: string,
    price: number,
    quantity: number
}

const CartItem: React.FC<Props> = (props) => {
    const {url, name, price, quantity, id} = props
    const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex flex-col my-4" data-testid={id}>
        <div className="flex items-center">
          <div className="w-[20%] relative mr-3 p-3">
            <img
              src={url}
              alt="cart"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-gray-700 text-sm">
              {name}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button data-testid="decreaseBtn" onClick={() => dispatch(decreaseQty(id))} className="rounded-full w-[20px] h-[20px] text-center bg-white inline-flex flex-col justify-center items-center text-[15px] border border-black text-balck hover:bg-black hover:text-white transition duration-150">
              <AiOutlineMinus />
            </button>
            <p className="text-sm" data-testid="quantity">{quantity}</p>
            <button data-testid="increaseBtn" onClick={() => dispatch(increaseQty(id))} className="rounded-full w-[20px] h-[20px] text-center bg-white inline-flex flex-col justify-center items-center text-[15px] border border-black text-balck hover:text-white hover:bg-black transition duration-150">
              <AiOutlinePlus />
            </button>
          </div>
          <p className="font-bold text-gray-700 text-lg">{price}€</p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
