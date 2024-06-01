import { BSON } from "realm";
import { CartItems, RealmContext } from "../../../database/schemas/cartItemsShema";
import { setCartProducts, setRemoveItem, setcardQuantity } from "../store/slices/CartProductsSlice";
import { setQuantity, setShowQuantity } from "../store/slices/ProductsListSlice";
import { QUANTITY_LIMIT, itemData } from "./constents";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { useRealm } = RealmContext

//adding cart details in to data base
const realmCartDetails = async(item:itemData,realm:any) => {
    const  userId = await AsyncStorage.getItem('userId');
    realm.write(() => {
        realm.create(
            'CartItems',
            {
                _id: new BSON.ObjectId(),
                id: item.id,
                itemName: item.itemName,
                itemQty:item.itemQty,
                itemPrice: item.itemPrice,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                total: item.total,
                userId: userId?JSON.parse( userId ) : null,
            }
        )
    })
}

//Incress and decress the quantity in cart using realm
const handleUpdateCartRealm= async(id:string,realm:any,item:itemData)=>{
    const  userId = await AsyncStorage.getItem('userId');
    realm.write(() => {
        let taskToUpdate = realm.objects('CartItems').filtered('id == $0 AND userId == $1', id, userId?JSON.parse( userId ) : null);
        if (taskToUpdate) {
            taskToUpdate[0].quantity = item.quantity;
            taskToUpdate[0].total = item.total;
        }
      });
}

//Remove cart item in Realm
const handleRemoveItemRealm=async(id:string,realm:any,item:any)=>{
    const  userId = await AsyncStorage.getItem('userId');
    realm.write(() => {
        let itemData = realm.objects('CartItems').filtered('id == $0 AND userId == $1', id, userId?JSON.parse( userId ) : null);
        if (itemData.length>0) {
            realm.delete(itemData);
        }
      });
}


//incress the quantity of the cart product

export const handleCartQuantity = (type: string, item: itemData, dispatch: any, realm:any) => {

    if (type === 'add' && item.quantity !== QUANTITY_LIMIT) {
        const quantity = item?.quantity + 1
        const amount = (item?.itemPrice * quantity) || 0;
        dispatch(setQuantity({ id: item.id, quantity: quantity }));
        dispatch(setcardQuantity({ id: item.id, quantity: quantity, total: amount }));
        handleUpdateCartRealm(item.id,realm,{...item,quantity: quantity, total: amount});
    } else if (type === 'remove' && item.quantity !== 1) {
        const quantity = item?.quantity - 1
        dispatch(setQuantity({ id: item.id, quantity: item?.quantity - 1 }))
        const amount = (item?.itemPrice * quantity) || 0;
        dispatch(setcardQuantity({ id: item.id, quantity: quantity, total: amount === 0 ? item.itemPrice : amount }));
        handleUpdateCartRealm(item.id,realm,{...item,quantity: quantity, total: amount});
    } else if (item.quantity === 1 && type === 'remove') {
        dispatch(setRemoveItem({ id: item.id }));
        dispatch(setShowQuantity({ id: item.id }));
        handleRemoveItemRealm(item.id,realm,item);
    }
}

//add to cart
export const handelAddToCart = (id: string, dispatch: any, item: itemData, realm:any) => {
    dispatch(setShowQuantity({ id: id }));
    dispatch(setCartProducts({ ...item, total: item.itemPrice }));
    realmCartDetails({ ...item, total: item.itemPrice },realm);
}