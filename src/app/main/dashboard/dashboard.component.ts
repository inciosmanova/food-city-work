import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { DailyRootResult, GetMenuData, TableRequestModel } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';
import { LoginService } from 'src/app/_services/login-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
   requsetData:TableRequestModel={
    currentPageName: '',
    exportToExcel: false,
    nextPageNumber: 1,
    visibleItemCount: 10,
    filters: [
    ],
    beginDate: '',
    endDate:''
  }
  ELEMENT_DATA: DailyRootResult[] = [];

  displayedColumns: string[] = [  'docNo',  'date', 'operationType'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  menu:GetMenuData[]=[]

  constructor(
    private globalService:GlobalService,
    private loginService:LoginService,
    private router:Router
  ){}
  ngOnInit(): void {
      this.getMenu()
      this.getTable()
  }
  getMenu(){
    this.globalService.getMenus().subscribe(
      res=>{
        const targetIds = [1162, 1163, 1164, 1165];

// İstenilen id değerlerine sahip olanları filtrele
this.menu  = res.data.filter(item => targetIds.includes(item.id));
       }
    )
  }
  getTable(){
    this.requsetData.beginDate = new Date();
    this.requsetData.endDate = new Date();
    this.requsetData.beginDate.setDate( this.requsetData.beginDate.getDate() - 7);  // Bir hafta geri al
      this.requsetData.beginDate.toISOString().split('T')[0];  // YYYY-MM-DD formatına çevir
     this.globalService.getAllWarehouseOperationDaily(this.requsetData).subscribe(res=>{
      
      this.ELEMENT_DATA=res.data.result
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    })
  }
  logOut(){
this.loginService.logOut().subscribe(res=>{
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  this.router.navigateByUrl('/')
})
  }
  
}
