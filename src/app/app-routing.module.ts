import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './foo/create/create.component';
import { DeleteComponent } from './foo/delete/delete.component';
import { DetailsComponent } from './foo/details/details.component';
import { ListComponent } from './foo/list/list.component';
import { SignupComponent } from './foo/signup/signup.component';
import { UdpateComponent } from './foo/update/update.component';
import { FooGuard } from './guards/foo.guard';
import { SignupGuard } from './guards/signup.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  }, {
    path: 'signup', component: SignupComponent, canActivate: [SignupGuard]
  },{
    path: 'list', component: ListComponent, canActivate: [FooGuard], data: {requiredRoles: ['admin', 'user']}
  },{
    path: 'detail/:id', component: DetailsComponent, canActivate: [FooGuard], data: {requiredRoles: ['admin', 'user']}
  }, {
    path: 'create', component: CreateComponent, canActivate: [FooGuard], data: {requiredRoles: ['admin']}
  }, {
    path: 'update/:id', component: UdpateComponent, canActivate: [FooGuard], data: {requiredRoles: ['admin']}
  }, {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
