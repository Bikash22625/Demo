import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData=new EventEmitter<Product[] | []>();
  constructor(
    private http:HttpClient
  ) { }

  addProduct(data:any){
    console.log("Product Service Called");
    return this.http.post('  http://localhost:3000/products',data)
    
  }
  productList(){
    return this.http.get<Product[]>('  http://localhost:3000/products')
  }
  deleteProduct(id:number){
    console.log("Test Id",id);
    return this.http.delete(`http://localhost:3000/products/${id}`)
    
  }
  getProduct(id:any){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product)
  }
  popularProduct(){
    return this.http.get<Product[]>(`http://localhost:3000/products/?_limit=4`)
  }
  serachProduct(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(data:Product){
    let cardData=[];
   let localCart=localStorage.getItem('localCart');
   console.log(localCart);
   
   if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data]);
   }
   else{
    console.log("called else");
    
    cardData=JSON.parse(localCart);
    cardData.push(data);
    localStorage.setItem('localCart',JSON.stringify(cardData))
    
   }
   this.cartData.emit(cardData)
  }
  removeFromCart(productId:number){
    let carddata=localStorage.getItem('localCart');
    if(carddata){
      let items:Product[]=JSON.parse(carddata);
      items=items.filter((item:Product)=>productId!=item.id);
      console.log("Inside Remove cart",items);
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items)
    }
   
  }
  addCartDataToDb(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }
  getCartList(userId:number){
    return this.http.get<Product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'}).subscribe((result)=>{
    if(result && result.body){
      this.cartData.emit(result.body)
    }
    })
  }

  //remove cart data from database
  removeCartDataFromDB(cartId:number)
  {
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }
  cartPageData(){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user)[0].id;
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userId)
  }

  orderNow(data:order){
    return this.http.post('  http://localhost:3000/orders',data)
  }
  getOrderDataList(){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user)[0].id;
    return this.http.get<order[]>('  http://localhost:3000/orders?userId='+userId)
  }
  
  deleteCartItem(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      this.cartData.emit([])
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId);
  }
}
