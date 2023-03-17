export interface Signup{
    name:string,
    password:string,
    email:string
}

export interface Product{
    id:number
    name:string,
    price:string,
    description:string,
    image:string,
    category:string,
    color:string,
    quantity:undefined|number,
    productId:undefined|number
}

export interface cart{
    id:undefined|number
    name:string,
    price:string,
    description:string,
    image:string,
    category:string,
    color:string,
    quantity:undefined|number,
    userId:number,
    productId:number
}
export interface priceSummary{
   price:number,
   tax:number,
   discount:number,
   delivery:number,
   total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
    
 }