import { Component, NgZone, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { DailyRootResult, GetMenuData, TableRequestModel } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';
import { LoginService } from 'src/app/_services/login-service.service';
declare var $: any; // jQuery'nin tanımlanması

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  length!: number
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
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
  aboutData:any
  initialized = false;
  data:any
  galeryData:any
  displayedColumns: string[] = [  'docNo',  'date', 'operationType'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  menu:GetMenuData[]=[]
date:Date =new Date()
  constructor(
    private globalService:GlobalService,
    private loginService:LoginService,
    private router:Router,
    private ngZone: NgZone
  ){}
  ngOnInit(): void {
      this.getMenu()
      this.getTable()
      this.getAboutData()
  }


  getAboutData(){
    this.aboutData = ['a','b','c']
    this.data = ['../../../assets/images/icon/user.svg','../../../assets/images/icon/user.svg','../../../assets/images/icon/user.svg']
    this.generateOwlCarousel()
  
  }
  onChangePage(pe: PageEvent) {
    this.requsetData.nextPageNumber = pe.pageIndex + 1
    this.requsetData.visibleItemCount = pe.pageSize
    this.getTable()
  }

  generateOwlCarousel(){
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.galeryData = this.data
        const modalOwl = $('#about-carousel');
        modalOwl.owlCarousel({
          loop: true,
          nav: false,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplaySpeed: 1500,
          autoplayHoverPause: true,
          center: true,  // Mərkəzi şəkil ön planda olacaq
          dots: false,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 2
            },
            1000: {
              items: 3
            }
          }
        });

        modalOwl.on('mousewheel', '.owl-stage', function (e: any) {
          if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            modalOwl.trigger('prev.owl');
          } else {
            modalOwl.trigger('next.owl');
          }
          e.preventDefault();
        });
        this.initialized = true;
      }, 0); 
    });
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
      this.length = res.data.count
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
