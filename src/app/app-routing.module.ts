import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PrintWarehouseComponent } from './main/categories/warehouse/print-warehouse/print-warehouse.component';

const routes: Routes = [
  { path: 'stockPrint/:id', component: PrintWarehouseComponent },
  { path: '', component: LoginComponent, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'modules/main', component: MainComponent, loadChildren: () => import('./main/main.module').then(m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
