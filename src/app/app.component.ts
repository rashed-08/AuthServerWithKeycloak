import { Component } from '@angular/core';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from './services/login.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-ui';
  
  username: string;
  isLogged: any;
  isAdmin: any;

  constructor(private oauthService: OAuthService,
    private loginService: LoginService,
    private messageService: MessageService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/demo',
    redirectUri: window.location.origin,
    clientId: 'shop-front',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        // if (this.oauthService.getIdentityClaims()) {
        if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidIdToken()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          this.username = this.loginService.getUsername();
          this.messageService.sendMessage(this.username);
        } else {
          this.messageService.sendMessage('')
        }
      });

  }


  
}
