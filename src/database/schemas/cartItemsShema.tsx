import { createRealmContext } from "@realm/react";
import Realm from 'realm';

export class CartItems extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  id!:string;
  itemName!:string;
  userId!:string;
  itemPrice!:number;
  quantity!:number;
  imageUrl!:string
  total!:number
  itemQty!:string

  static schema={
    name:'CartItems',
    primaryKey:'_id',
    properties:{
        _id:'objectId',
        id:'string',
        itemName:'string',
        itemPrice:'int',
        quantity:'int',
        imageUrl:'string',
        total:'int',
        itemQty:'string',
        userId:'string'
    }
  }
}

export const RealmContext = createRealmContext({
    schema:[CartItems],
    // schemaVersion: 1 
})