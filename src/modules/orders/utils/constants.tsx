export interface OrderItem {
    amount: number;
    imageUrl: string;
    itemId: string;
    itemName: string;
    itemPrice: number;
    itemQty: string;
    _id: string;
  }
export interface OrderTotals {
    quantity: number;
    amount: number;
  }
  
export interface Order {
    addressId: string;
    createdAt: string;
    createdBy: string;
    date: string;
    discountPercentage?: number;
    deliveryFee?: number;
    addons?: number;
    coupon?: number;
    id: string;
    items: OrderItem[];
    orderStatus: string;
    reviews: any[];
    totals: OrderTotals;
    updatedAt: string;
    updatedBy: string;
    userId: string;
    _id: string;
  }