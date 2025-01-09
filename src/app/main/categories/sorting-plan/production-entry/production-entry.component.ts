import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { GlobalService } from 'src/app/_services/global.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-production-entry',
  templateUrl: './production-entry.component.html',
  styleUrls: ['./production-entry.component.scss']
})
export class ProductionEntryComponent {
  id:any;
  printOrder!:any
  warehouseOperationDetails!:any
  warehouseOperationMaterials!:any
  services:any[]=[]
  qrData: string = ''
  elementType = NgxQrcodeElementTypes.URL;

  printDetail:any[]=[];
  pagePath!: string;
  filterSelectObj: any = [];
  filterForm!: FormGroup;
  allSum:number=0
  fromLogging: boolean | string = false;
  WareHouseDoors: any[] = [];
  typePage: any;
  details: any[]=[];
  materials: any[]=[];
  userName: string = ''
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(private ActivatedRoute:ActivatedRoute,
    private globalService:GlobalService,
    private router: Router,


    ){
  }

  type:any
  dataSource:any[] = [];
  ngOnInit(): void {
    this.getOutput()
    this.getTokenName()
  }
  orderId!:any
  servis:any[]=[]
  order!:any
  originalData!:any[]
  date!: any;


  
  getTokenName() {
    let token = localStorage.getItem('token')?.toString()
    let tokenData = this.getDecodedAccessToken(token);
    const fullName = tokenData.fullName
    this.userName = fullName == null ? undefined : fullName
    this.qrData = `https://portal.foodcity.az/${this.id}`

  }
  getDecodedAccessToken(token?: any): any {
    try {
      return jwtDecode(token?.toString());
    }
    catch (Error) {
      return null;
    }
  }


getOutput(){

const today = new Date();
  const oneMonthLater = new Date(today.getFullYear(), today.getMonth() , today.getDate());

  this.date= oneMonthLater;
  this.ActivatedRoute.paramMap.subscribe((params:any) => {
    this.id = params.get('id');
    this.globalService.getProductionEntryById(this.id).subscribe({
      next: (res) => {


    this.printOrder = res.data?.main
    this.details=res.data?.details

    // for (let indexx = 0; indexx < this.products?.length; indexx++) {
    //   if (indexx==0) {
    //     this.orderId=this.products[0]?.orderId

    //   }
    //   else{
    //     this.orderId=this.warehouseOperationDetails[indexx]?.orderId
    //     this.orderServices
    //     .getOrderById(this.warehouseOperationDetails[indexx]?.orderId, this.fromLogging)
    //     .subscribe({
    //       next: (res) => {

    //        this.services.push(res?.data?.services)
    //        this.order=res?.data?.order?.orderNo
    //        for (let index = 0; index < res?.data?.services?.length; index++) {
    //         for (let i = 0; i < this.services[index]?.length; i++) {
    //           this.ServicesService.EditService(this.services[index][i]?.serviceId).subscribe(res => {

    //             this.servis.push(res?.data?.name)
    //           })

    //         }

    //        }
    //       },
    //     });
    //   }
    // }
      }
   })
});
}




}
