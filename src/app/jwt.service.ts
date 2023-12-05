import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  public getIssuer(token: string): any{
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.iss;
  }

  public getClaim(token: string, claimKey: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimKey] : null;
  }

  public checkTokenValidity(token: string): boolean{
    if(token === null || this.jwtHelper.isTokenExpired(token)){
      return false;
    }
    else{
      return true;
    }
  }
  
}