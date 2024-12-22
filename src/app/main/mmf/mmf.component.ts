import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmtextComponent } from './confirmtext/confirmtext.component';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  TableRequestModel,
  OperationRootResult,
  OperationRootResult2,
} from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';
import { NewMmfComponent } from './new-mmf/new-mmf.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mmf',
  templateUrl: './mmf.component.html',
  styleUrls: ['./mmf.component.scss'],
})
export class MmfComponent {
  readonly dialog = inject(MatDialog);
  length!: number;
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
  status: number = 0;
  dateFilter!: FormGroup;
  statusResult: any[] = [];
  browseResult: any[] = [];
  resultBrowse: any;
  statusWithCount: any;
  fullName:any
  constructor(private globalService: GlobalService, 
    private fb: FormBuilder,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getAllMMF(this.status);
     this.fullName = localStorage.getItem('fullName');

  }
  onChangePage(pe: PageEvent) {
    this.requsetData.nextPageNumber = pe.pageIndex + 1;
    this.requsetData.visibleItemCount = pe.pageSize;
    this.getAllMMF(this.status);
  }

  createForm() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.dateFilter = this.fb.group({
      beginDate: [oneWeekAgo],
      endDate: [new Date()],
    });
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
  }
  getAllMMF(status: number) {
    this.status = status;

    this.globalService
      .getCompanyApplicationBrowseData(this.requsetData, status)
      .subscribe((res) => {
        this.length = res.data.browse.count;
        this.statusResult = res.data.statuses;
        debugger
        this.statusResult.map(res=>{
          res.id ==1 ? res.count = this.statusWithCount[0].pendingCount :''
          res.id ==2 ? res.count = this.statusWithCount[0].cancelCount :''
          res.id ==3 ? res.count = this.statusWithCount[0].acceptedCount :''
          res.id ==4 ? res.count = this.statusWithCount[0].solvedCount :''
        })
     
        this.browseResult = res.data.browse.result;
        this.statusWithCount = res.data.statusWithCount;
      });
  }
  onDateRangeChange() {
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllMMF(this.status);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmtextComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addMMF(id:any=0) {
    // const dialogRef = this.dialog.open(NewMmfComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
    id==0? this.router.navigate(['/modules/main/mmf/add-mmf']) :
    this.router.navigate(['//modules/main/mmf/add-mmf'], { state: id });

  }
}
