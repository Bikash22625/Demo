import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default'
  sellerName: string = '';
  userName:string='';
  searchResult:undefined | Product[]
  cartItems=0;
  constructor(private router: Router,
    private productService: ProductService) {

  }
  ngOnInit() {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name
          }

        }else if(localStorage.getItem('user')){
          this.menuType="user"
          let userStore=localStorage.getItem('user');
          console.log(userStore);
          let userData=userStore && JSON.parse(userStore)[0];
          let userId=userStore && JSON.parse(userStore)[0].id;
          this.userName=userData.name
          console.log(this.userName);
          this.productService.getCartList(userId)
          
        }
        else {
          this.menuType = "default";

        }
      }
    })

    //showing cart value start
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((result)=>{
      this.cartItems=result.length
    })

    // ends here



    
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      console.log('query', element.value);
      this.productService.serachProduct(element.value).subscribe((result) => {
        if(result.length>5){
          result.length=5;
          this.searchResult=result;
        }
        this.searchResult=result;
       
      })

    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(value:string){
    this.router.navigate([`search/${value}`])
    
  }
  redirectToDetail(id:number){
    this.router.navigate([`details/${id}`])
    
  }
}
