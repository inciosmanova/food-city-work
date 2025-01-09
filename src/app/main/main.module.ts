import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { MmfComponent } from './mmf/mmf.component';
import { ProfileComponent } from './profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmtextComponent } from './mmf/confirmtext/confirmtext.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MyinformationComponent } from './categories/myinformation/myinformation.component';
import { MycontractsComponent } from './categories/mycontracts/mycontracts.component';
import { MyinvoicesComponent } from './categories/myinvoices/myinvoices.component';
import { MyordersComponent } from './categories/myorders/myorders.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { UnAuthorizedInterceptor } from '../_interceptors/un-authorized-interceptor.ts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WarehouseComponent } from './categories/warehouse/warehouse.component';
import { TerminalComponent } from './categories/terminal/terminal.component';
import { SortingPlanComponent } from './categories/sorting-plan/sorting-plan.component';
import { CustomsClearanceComponent } from './categories/customs-clearance/customs-clearance.component';
import { ReportsComponent } from './categories/reports/reports.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';

import { LoadingInterceptor } from '../_interceptors/loading-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NewMmfComponent } from './mmf/new-mmf/new-mmf.component';
import { SafeStockPipe } from './categories/warehouse/print-warehouse/safe-stock-pipe.pipe';
import { PrintWarehouseComponent } from './categories/warehouse/print-warehouse/print-warehouse.component';
import { ProductionReadyPrintPipe } from './categories/sorting-plan/production-ready-print.pipe';
import { ProductionEntryPipe } from './categories/sorting-plan/production-entry.pipe';
import { ProductionEntryComponent } from './categories/sorting-plan/production-entry/production-entry.component';
import { ProductionReadyPrintComponent } from './categories/sorting-plan/production-ready-print/production-ready-print.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    CategoriesComponent,
    MmfComponent,
    ProfileComponent,
    ConfirmtextComponent,
    MyinformationComponent,
    MycontractsComponent,
    MyinvoicesComponent,
    MyordersComponent,
    WarehouseComponent,
    TerminalComponent,
    SortingPlanComponent,
    CustomsClearanceComponent,
    ReportsComponent,
    NewMmfComponent,
    SafeStockPipe,
    ProductionEntryPipe,
    ProductionReadyPrintPipe,
    PrintWarehouseComponent,
    ProductionReadyPrintPipe,
    ProductionEntryPipe,
    ProductionEntryComponent,
    ProductionReadyPrintComponent
         
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CarouselModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    SlickCarouselModule,
    CarouselModule,
    MatPaginatorModule,
  ],
  providers: [
    DatePipe ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 

})
export class MainModule { }
