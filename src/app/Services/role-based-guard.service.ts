import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolebasedguardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let roles = route.data["roles"] as Array<string>;
    var user=localStorage.getItem('user');
    var id=localStorage.getItem('id');
    if (user===roles[0] || roles[0]==='Employee' && id){
      return true
    }
    else{
      if(user!=='HR')
        this.router.navigate(["/employee"])
      else if(user==='HR')
        this.router.navigate(["/hr"])
      else
        this.router.navigate(["/login"])
      return false
    }
   }
}
