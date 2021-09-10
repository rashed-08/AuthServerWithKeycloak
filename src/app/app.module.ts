import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ListComponent } from './foo/list/list.component';
import { DetailsComponent } from './foo/details/details.component';
import { CreateComponent } from './foo/create/create.component';
import { UdpateComponent } from './foo/update/update.component';
import { DeleteComponent } from './foo/delete/delete.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './foo/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ListComponent,
    DetailsComponent,
    CreateComponent,
    UdpateComponent,
    DeleteComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081/api/v1/foo'],
        sendAccessToken: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
