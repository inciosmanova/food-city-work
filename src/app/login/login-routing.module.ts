import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { LoginGuard } from './login.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: 'modules/main/exit', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LogInComponent  ,canActivate: [RoleGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
