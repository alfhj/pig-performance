import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // Remember to add auth on routes
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'info-page', component: InfoPageComponent}
];

// Denne skal mellom '' og 'home' i Routes:
// {path: 'post/:id', component: PostComponent},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
