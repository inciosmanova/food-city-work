import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableRequestModel, OrderResult, OrderResult2 } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';
import { ConfirmtextComponent } from '../../mmf/confirmtext/confirmtext.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-sorting-plan',
  templateUrl: './sorting-plan.component.html',
  styleUrls: ['./sorting-plan.component.scss']
})
export class SortingPlanComponent {
  length!: number
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
  readonly dialog = inject(MatDialog);
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
  statusResult: OrderResult[] = [];
  browseResult: OrderResult2[] = [];
resultBrowse: any;
status:number=0
  constructor(private globalService: GlobalService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    this.getAllOrdersBrowseMobile(this.status)

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
  getAllOrdersBrowseMobile(status: number) {
    this.status=status
    this.globalService
      .getAllOrdersBrowseMobile(this.requsetData,9, status)
      .subscribe((res) => {
        this.length = res.data.browse.count
        this.statusResult = res.data.status.result;
        this.browseResult = res.data.browse.result;
      });
  }
  onDateRangeChange(){
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllOrdersBrowseMobile(this.status)
  }
  onChangePage(pe: PageEvent) {
    this.requsetData.nextPageNumber = pe.pageIndex + 1
    this.requsetData.visibleItemCount = pe.pageSize
    this.getAllOrdersBrowseMobile(this.status)
  }


  openDialog(){
    const dialogRef = this.dialog.open(ConfirmtextComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }
}
