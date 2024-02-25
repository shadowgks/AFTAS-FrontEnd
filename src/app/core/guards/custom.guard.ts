import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { authUtils } from "../utils/auth.utils";

@Injectable({
  providedIn: 'root'
})

export class CustomGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(){
    if(authUtils.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/auth/sign-in'])
      return false;
    }
  }
}