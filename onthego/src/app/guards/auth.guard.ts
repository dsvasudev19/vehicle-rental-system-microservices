import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true; 
        } else {
          this.router.navigate(['/auth/login']); 
          return false;
        }
      }),
      catchError((error) => {
        console.error(error);
        this.router.navigate(['/auth/login']); 
        return [false];
      })
    );
  }
}
