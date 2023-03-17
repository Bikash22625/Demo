import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 userAuthError=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,
    private router:Router) { }

  userSignup(data:any){
    this.http.post('http://localhost:3000/users',data,{observe:'response'}).
    subscribe((result)=>{
   
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
      
    })
    
  }
  userLogin(data: any) {
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
        
          this.userAuthError.emit(false)
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])

        }
        else {
         
         this.userAuthError.emit(true)

        }
      })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
