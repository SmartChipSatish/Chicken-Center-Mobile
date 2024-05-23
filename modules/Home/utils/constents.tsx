import { useEffect, useState } from "react";

export interface itemsDetails {
  title: string,
  imgUrl: string,
  price: number,
  quantity: number,
  id: number,
  favourite: boolean
}

export interface cartProducts {
  id:number
  title: string,
  price: number,
  quantity: number,
  imgUrl: string,
  total: number
}
export const QUANTITY_LIMIT = 10
export const data: itemsDetails[] = [
  {
    title: "Chicken Skinless 500g",
    imgUrl: 'https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png',
    price: 270,
    quantity: 1,
    id: 1,
    favourite: true
  },
  {
    title: "Chicken Boneless",
    imgUrl: 'https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png',
    price: 400,
    quantity: 1,
    id: 2,
    favourite: false
  },
  {
    title: "Chicken Wings",
    imgUrl: 'https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png',
    price: 300,
    quantity: 1,
    id: 3,
    favourite: true
  },
  {
    title: "Chicken Joints",
    imgUrl: 'https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png',
    price: 320,
    quantity: 1,
    id: 4,
    favourite: false
  }
];

export function useDetectFirstRender() {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return firstRender;
}