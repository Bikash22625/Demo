import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Signup } from '../data-type'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  // sellerSignupForm!:FormGroup<Signup>
  showLogin = false;
  authError='';
  
  constructor(private fb: FormBuilder,
    private seller: SellerService,
    private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }


  sellerSignup(data: any) {
    this.seller.userSignup(data);
  }

  sellerLogin(data: any) {
    this.authError=''
    this.seller.userLogin(data);
    this.seller.isLoggedInError.subscribe((error)=>{
      if(error){
        this.authError="Email or Password is not corrent!";
      }
    })
  }

  showLoginPage() {
    this.showLogin = true;
  }

  showSingupPage() {
    this.showLogin = !this.showLogin
  }

}


