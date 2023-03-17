import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
addProductMessage:string|undefined;
  constructor(
    private productService:ProductService
  ){}
  addProducts(data:any)
  {
    this.productService.addProduct(data).subscribe((result)=>
    {
      console.log(result);
      if(result){
        this.addProductMessage="Product is added successfully";
      }
      setTimeout(()=>this.addProductMessage=undefined,3000)
      
      
    })
    
  }
}
