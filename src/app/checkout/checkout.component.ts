import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { order,cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice:undefined|number
  cartData:cart[]|undefined

  constructor(private productService:ProductService,private router:Router){

  }

  ngOnInit():void{
    this.productService.cartPageData().subscribe((result)=>{
    let price=0;
    this.cartData=result
    result.forEach((item)=>{
      if(item.quantity){
        price=price+(+item.price * item.quantity)
      }
    })
    this.totalPrice=price+(price/10)+100-(price/10);
      
     
    })

    
  }

  orderNow(data:{email:string,address:string,contact:string}){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user)[0].id;
    if(this.totalPrice){
      let orderData:order={
        ...data,
      totalPrice:this.totalPrice,
      userId,
      id:undefined
      }
      this.productService.orderNow(orderData).subscribe((result)=>{
        if(result){
         this.cartData?.forEach((item)=>{
          
         })
          this.router.navigate(['/my-orders'])
        }
      })
    }
   
    
  }
}
