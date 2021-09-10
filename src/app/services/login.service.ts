import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oauthService: OAuthService) { }

  login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  logout():void {
    this.oauthService.logOut();
  }

  public getUsername() {
    return this.oauthService.getIdentityClaims()[`preferred_username`];
  }

  public getIsLogged(): boolean {
    return (
      this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()
    );
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
    
  }
}
