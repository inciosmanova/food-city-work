import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmtextComponent } from '../../mmf/confirmtext/confirmtext.component';
import { OrderBrowse, OrderResult, OrderResult2, TableRequestModel } from 'src/app/_models/global.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent {
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
      .getAllOrdersBrowseMobile(this.requsetData,1, status)
      .subscribe((res) => {
        this.statusResult = res.data.status.result;
        this.browseResult = res.data.browse.result;
      });
  }
  onDateRangeChange(){
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllOrdersBrowseMobile(this.status)
  }

  openDialog(){
    const dialogRef = this.dialog.open(ConfirmtextComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }
}
