import { Component } from '@angular/core';
import {cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = false;
  authError: string = ''
  constructor(private userService: UserService,private productService:ProductService) {

  }
  ngOnInit(): void {
    this.userService.userAuthReload()
  
  }

  userSignup(data: any) {
    // console.log(data);
    this.userService.userSignup(data)

  }
  userLogin(data: any) {
    this.userService.userLogin(data);
    this.userService.userAuthError.subscribe((result) => {
      if (result) {
        this.authError = "Please Enter valid User Details"
      }else{
        console.log("Indide Login part");
              setTimeout(() => {
                this.localCartDataStoreToDB();
              }, 200);
        
        
      }

    })
  }
  showLoginPage() {
    this.showLogin = true;
  }
  showSingupPage() {
    this.showLogin = !this.showLogin;
  }
  localCartDataStoreToDB(){
    let data=localStorage.getItem('localCart');
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user)[0].id;
    if(data){
      console.log("Data",data);
    
      
      let cartDataList:Product[]=JSON.parse(data);
     
      console.log("UserId in ",userId);
      
      cartDataList.forEach((product:Product,index)=> {
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        }
        
        delete cartData.id;
         setTimeout(() => {
          this.productService.addCartDataToDb(cartData).subscribe((result)=>{
            if(result){
              console.log("item strored from localcart to DB;");
              
            }
            if(cartDataList.length==index+1){
              localStorage.removeItem('localCart')
               }
          })
        }, 500); 
       
      
      });
    }
    this.productService.getCartList(userId);
   
  }
}
