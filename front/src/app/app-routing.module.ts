import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DahboardComponent } from './components/login/dahboard/dahboard.component';
import { AdduserdataComponent } from './components/adduserdata/adduserdata.component';
import { AdminFeedComponent } from './components/admin-feed/admin-feed.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login', component: LoginComponent, children: [
      { path: 'dashboard', component: DahboardComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  {path: 'adduserdata', component: AdduserdataComponent},
  {path: 'adminfeed', component: AdminFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
