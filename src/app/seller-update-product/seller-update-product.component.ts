import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  updateProductMessage:undefined|string;
  productData:undefined |Product
  isRoute:boolean=false;
  constructor(private router:ActivatedRoute,
    private route:Router,
    
    private productService:ProductService){

  }
  ngOnInit():void{
    let productId=this.router.snapshot.paramMap.get('id');
    console.log(productId);
   productId && this.productService.getProduct(productId).subscribe((result)=>{
      console.log("Inside Update ",result);
      
        this.productData=result;
    
     
      
    })
    
  }
  updateProducts(data:Product){
    console.log(data);
    if(this.productData){
      data.id=this.productData.id
    }
   this.productService.updateProduct(data).subscribe((result)=>{
    if(result){
      this.updateProductMessage="Product updated Successfully"
     
    }setTimeout(()=>this.updateProductMessage=undefined,3000)
     setTimeout(() => {
      this.route.navigateByUrl('seller-home')
     }, 3000);
   })
   
  }
}
