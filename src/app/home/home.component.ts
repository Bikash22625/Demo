import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts:undefined | Product[]
  productList:undefined|Product[]
	images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(
    private productService:ProductService
  ){

  }
ngOnInit():void{
  this.productService.popularProduct().subscribe((result)=>{
console.log("Popular  Products",result);
this.popularProducts=result;

  })
  this.productService.productList().subscribe((result)=>{
    this.productList=result;
    console.log("Product List",result);
    
  })
}
}
