import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData:undefined|Product
  productQuantity:number=1
  cartData:Product|undefined
  removeCart=false;
  constructor(private activeRoute:ActivatedRoute,
    private productService:ProductService){

  }
  ngOnInit():void{

    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result)=>{
      this.productData=result;
    })

    let cartData=localStorage.getItem('localCart');
    if(productId && cartData){
      let items=JSON.parse(cartData)
      items=items.filter((item:Product)=>productId==item.id.toString())
      if(items.length){
        this.removeCart=true
      }else{
        this.removeCart=false
      }

    }
//On Refreshing cart value was getting zero after login 
    let user=localStorage.getItem('user');
       
        if(user){
          let userId=user && JSON.parse(user)[0].id;
          this.productService.getCartList(userId);
          this.productService.cartData.subscribe((result)=>{
          let item=result.filter((item:Product)=>productId?.toString()===item?.productId?.toString())
          if(item.length){
            this.cartData=item[0]
           this.removeCart=true
           
          }
          })
        }
        //ends here
    
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val=='minus'){
      this.productQuantity-=1;
    }

  }

  //add cart to DB
  addTocart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity
      if(!localStorage.getItem('user')){
        this.productService.localAddToCart(this.productData)
        this.removeCart=true
        
      }else{
        console.log("Cart user is logged in");
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user)[0].id;
        console.log("cart user Id",userId);
        let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id
        console.log("Cart ",cartData);
        this.productService.addCartDataToDb(cartData).subscribe((result)=>{
          console.log("added to Db",result);
          this.productService.getCartList(userId);
          this.removeCart=true
          
        })
        
      }

      
    }
  }

  removeTocart(productId:number){
    if(!localStorage.getItem('user')){
      this.productService.removeFromCart(productId);
      this.removeCart=false
    }else{
    //  this.productService.removeCartDataFromDB()
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user)[0].id;
    console.log(this.cartData);
  this.cartData && this.productService.removeCartDataFromDB(this.cartData.id).subscribe((result)=>{
      if (result) {
        this.productService.getCartList(userId);
        
      }
      
    })
    this.removeCart=false;
    }
  
    
  }

}
