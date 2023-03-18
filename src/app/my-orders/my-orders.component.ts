import { Component } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData:order[]|undefined

  constructor(private productService:ProductService){

  }

  ngOnInit():void{
    this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.productService.cancelOrder(orderId).subscribe((result)=>{
     
    })
    this.getOrderList();
  }

  getOrderList(){
    this.productService.getOrderDataList().subscribe((result)=>{
      this.orderData=result
          })
  }

}
