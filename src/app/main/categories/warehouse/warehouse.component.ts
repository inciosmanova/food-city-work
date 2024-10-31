import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  OperationRootResult,
  OperationRootResult2,
  OperationRootStatus,
  TableRequestModel,
} from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  requsetData: TableRequestModel = {
    currentPageName: '',
    exportToExcel: false,
    nextPageNumber: 1,
    visibleItemCount: 10,
    filters: [],
    beginDate: '',
    endDate: '',
  };
  status:number=0
  dateFilter!: FormGroup;
  statusResult: OperationRootResult[] = [];
  browseResult: OperationRootResult2[] = [];
resultBrowse: any;
  constructor(private globalService: GlobalService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    this.getAllWarehouseOperation(this.status)

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
  getAllWarehouseOperation(status: number) {
    this.status=status

    this.globalService
      .getAllWarehouseOperation(this.requsetData, status)
      .subscribe((res) => {
        this.statusResult = res.data.status.result;
        this.browseResult = res.data.browse.result;
      });
  }
  onDateRangeChange(){
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllWarehouseOperation(this.status)
  }
}
