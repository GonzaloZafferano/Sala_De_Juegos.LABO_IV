import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanDeactivate<unknown>, CanLoad {
  constructor(private firestoreLogin: FirestoreLoginService, private router: Router,) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      if (this.firestoreLogin.getUsuarioEstaLogueado) 
        return true;
      
      this.router.navigate(['/login']);
      return false;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;     
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
