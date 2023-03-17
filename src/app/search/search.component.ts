import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|Product[]
  constructor(private activeRoute:ActivatedRoute,
    private productService:ProductService){

  }
  ngOnInit():void{
   let query= this.activeRoute.snapshot.paramMap.get('query')
    console.log(query);
    query && this.productService.serachProduct(query).subscribe((result)=>{
      this.searchResult=result
    })
    
  }

}
