import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { MmfComponent } from './mmf/mmf.component';
import { ProfileComponent } from './profile/profile.component';
import { MyinformationComponent } from './categories/myinformation/myinformation.component';
import { MycontractsComponent } from './categories/mycontracts/mycontracts.component';
import { MyinvoicesComponent } from './categories/myinvoices/myinvoices.component';
import { MyordersComponent } from './categories/myorders/myorders.component';
import { LoginGuard } from '../login/login.guard';
import { WarehouseComponent } from './categories/warehouse/warehouse.component';
import { TerminalComponent } from './categories/terminal/terminal.component';
import { SortingPlanComponent } from './categories/sorting-plan/sorting-plan.component';
import { CustomsClearanceComponent } from './categories/customs-clearance/customs-clearance.component';
import { ReportsComponent } from './categories/reports/reports.component';

const routes: Routes = [
  { path: 'modules/main', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  { path: 'dashboard/warehouse', component: WarehouseComponent, canActivate: [LoginGuard]},
  { path: 'dashboard/sortingplan', component: SortingPlanComponent, canActivate: [LoginGuard]},
  { path: 'categories', component: CategoriesComponent, canActivate: [LoginGuard]},
  { path: 'dashboard/terminal', component: TerminalComponent, canActivate: [LoginGuard]},
  { path: 'categories/profile', component: MyinformationComponent, canActivate: [LoginGuard]},
  { path: 'categories/customs', component: CustomsClearanceComponent, canActivate: [LoginGuard]},
  { path: 'categories/contract', component: MycontractsComponent, canActivate: [LoginGuard]},
  { path: 'categories/invoice', component: MyinvoicesComponent, canActivate: [LoginGuard]},
  { path: 'categories/order', component: MyordersComponent, canActivate: [LoginGuard]},
  { path: 'categories/report', component: ReportsComponent, canActivate: [LoginGuard]},
  { path: 'mmf', component: MmfComponent, canActivate: [LoginGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
