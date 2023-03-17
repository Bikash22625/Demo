import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Product} from '../data-type'
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList:undefined | Product[];
  deleteIcon=faTrash;
  editIcon=faEdit
  productMessage:undefined|string;
  constructor(
    private productService:ProductService
  ){}

  ngOnInit():void{
    this.showProductList();
  }
deleteProduct(id:number){
console.log("Id",id);
this.productService.deleteProduct(id).subscribe((result)=>{
  if(result){
    this.productMessage="Product is deleted successFully";
    this.showProductList();
  }
  setTimeout(()=>this.productMessage=undefined,3000)
})
  
}

showProductList(){
  this.productService.productList().subscribe((result)=>{
    console.log(result);
    this.productList=result;
    
  })
}

}
