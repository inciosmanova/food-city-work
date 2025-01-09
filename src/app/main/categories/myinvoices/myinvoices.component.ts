import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmtextComponent } from '../../mmf/confirmtext/confirmtext.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvoicesPaymentStatus, InvoicesResult, InvoicesStatusWithCount, SubTypeRootData, TableRequestModel} from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-myinvoices',
  templateUrl: './myinvoices.component.html',
  styleUrls: ['./myinvoices.component.scss']
})
export class MyinvoicesComponent {
  readonly dialog = inject(MatDialog);
  length!: number
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
  requsetData: TableRequestModel = {
    currentPageName: '',
    exportToExcel: false,
    nextPageNumber: 1,
    visibleItemCount: 10,
    filters: [],
    beginDate: '',
    endDate: '',
  };
  dateFilter!: FormGroup;
  statusResult: InvoicesPaymentStatus[] = [];
  browseResult: InvoicesResult[] = [];
  statusWithCount: InvoicesStatusWithCount[] | any = [];

reasonType:SubTypeRootData[]=[]
status:number=0
  constructor(private globalService: GlobalService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getReasonType()
    this.createForm();  
    this.getAllInvoices(this.status)

  }
  createForm() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.dateFilter = this.fb.group({
      beginDate: [oneWeekAgo],
      endDate: [new Date()],
      reasonType: [-1],
    });
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
  }
  getAllInvoices(status:any,reasonType?:any ) {
    this.status=status
this.requsetData.filters[0] = {   
     "columnName": 'paymentStatusId',
      "value": String(status),
      "order": 0,
    };
    // [{"columnName":"paymentStatusId","value":"1","order":0}]
    reasonType ?this.dateFilter.value.reasonType=reasonType :''
    this.globalService
      .getAllInvoices(this.requsetData , 0, this.dateFilter.value.reasonType)
      .subscribe((res) => {
        this.length = res.data.browse.count
        this.statusResult = res.data.paymentStatuses;
        ;
        this.browseResult = res.data.browse.result;
        res.data.statusWithCount.length>0 ?this.statusWithCount = res.data.statusWithCount:this.statusWithCount = res.data.paymentStatuses
      });
  }
  onDateRangeChange(){
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllInvoices( this.status)
  }
  onChangePage(pe: PageEvent) {
    this.requsetData.nextPageNumber = pe.pageIndex + 1
    this.requsetData.visibleItemCount = pe.pageSize
    this.getAllInvoices(this.status)
  }

  openDialog(){
    const dialogRef = this.dialog.open(ConfirmtextComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  
  }
  getReasonType(){
    this.globalService.getSpeCodeByType("InvoiceSubTypes").subscribe(res=>{
      this.reasonType=res.data
    })
  }
  selectType(id:number){
    this.getAllInvoices( this.status,id)
  }
}
