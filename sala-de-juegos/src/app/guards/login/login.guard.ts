import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreLoginService } from '../../services/firestoreAuthLog/firestore-auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private firestoreLogin: FirestoreLoginService, private router: Router,) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.firestoreLogin.getUsuarioEstaLogueado) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
      return true;      
  }
}
