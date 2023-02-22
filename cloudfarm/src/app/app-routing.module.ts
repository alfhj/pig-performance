import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoPageComponent } from './info-page/info-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'info-page', component: InfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
