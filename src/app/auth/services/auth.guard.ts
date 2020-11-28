import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {}
  canActivate() {
      console.log(this.authService.isLoggedIn())
      if (this.authService.isLoggedIn() == false) {
        window.alert('You don\'t have permission to view this page');
        this.router.navigateByUrl('/auth/login')
        return false;
      }

      return true;
  }
  
}
