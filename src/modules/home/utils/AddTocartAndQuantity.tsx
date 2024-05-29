import { setCartProducts, setRemoveItem, setcardQuantity } from "../store/slices/CartProductsSlice";
import { setQuantity, setShowQuantity } from "../store/slices/ProductsListSlice";
import { QUANTITY_LIMIT, itemData } from "./constents";

//incress the quantity of the cart product

export const handleCartQuantity = (type: string, item: itemData, dispatch: any) => {
    
    if (type === 'add' && item.quantity !== QUANTITY_LIMIT) {
        const quantity = item?.quantity + 1
        const amount = (item?.itemPrice * quantity) || 0;
        dispatch(setQuantity({ id: item.id, quantity: quantity }));
        dispatch(setcardQuantity({ id: item.id, quantity: quantity, total: amount }));
    } else if (type === 'remove' && item.quantity !== 1) {
        const quantity = item?.quantity - 1
        dispatch(setQuantity({ id: item.id, quantity: item?.quantity - 1 }))
        const amount = (item?.itemPrice * quantity)  || 0;
        dispatch(setcardQuantity({ id: item.id, quantity: quantity, total: amount === 0? item.itemPrice : amount }));
    } else if (item.quantity === 1 && type === 'remove') {
        dispatch(setRemoveItem({ id: item.id }));
        dispatch(setShowQuantity({ id: item.id }));
    }
}

//add to cart
export const handelAddToCart=(id:string, dispatch:any, item:itemData)=>{
    dispatch(setShowQuantity({id:id}));
    dispatch(setCartProducts({...item,total: item.itemPrice}));
  }