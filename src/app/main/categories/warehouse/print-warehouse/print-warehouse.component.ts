import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { GlobalService } from 'src/app/_services/global.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-print-warehouse',
  templateUrl: './print-warehouse.component.html',
  styleUrls: ['./print-warehouse.component.scss']
})
export class PrintWarehouseComponent {
  id: any;
  printOrder!: any
  warehouseOperationDetails: any[] = []
  warehouseOperationMaterials: any[] = []
  services: any[] = []
  printDetail: any[] = [];
  pagePath!: string;
  filterSelectObj: any = [];
  filterForm!: FormGroup;
  allSum: number = 0
  fromLogging: boolean | string = false;
  WareHouseDoors: any[] = [];
  typePage: any;
  date!: any;
  // barcode: any = '12345678';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrData: string = '111111111111111111111111111111111'
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,

  ) { }

  type: any
  dataSource: any[] = [];
  orderId!: any
  order!: any
  originalData!: any[]
  userName: string = ''

  ngOnInit(): void {
    // this.getLanguageContent()
    this.getOutput()
    this.getTokenName()
  }

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

  packQuantity:number=0
  bruttoKg:number=0
  tara:number=0
  nettoKg:number=0
  getOutput() {
    const today = new Date();
    const oneMonthLater = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    this.date = oneMonthLater;
    this.ActivatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      
      this.globalService.getWarehouseOperationById(this.id).subscribe((response) => {
        // this.SelectWareHouse(response?.data?.warehouseOperationDetails?.exitWarehouseId)

        this.printOrder = response?.data?.warehouseOperation
      this.type = response?.data?.warehouseOperation.type

        this.warehouseOperationDetails = response?.data?.warehouseOperationDetails
        this.warehouseOperationMaterials = response?.data?.warehouseOperationMaterials
        this.services = response?.data?.warehouseOperationServices
        this.warehouseOperationDetails.map(res=>{
this.packQuantity+=res.packQuantity
this.bruttoKg+=res.bruttoKg
this.tara+=res.tara
this.nettoKg+=res.nettoKg
        })

      })
    });
  }
  // SelectWareHouse(key: any) {
  //   this.VehicleService.GetWareHouseDoor(key, 1).subscribe((res) => {
  //     this.WareHouseDoors = res?.data;
  //   });
  // }



}
