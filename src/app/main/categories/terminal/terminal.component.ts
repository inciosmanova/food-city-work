import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableRequestModel, TerminalResult, TerminalResult2 } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit{
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
  statusResult: TerminalResult[] = [];
  browseResult: TerminalResult2[] = [];
resultBrowse: any;
  constructor(private globalService: GlobalService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    this.getAllWarehouseOperation(0)

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
    this.globalService
      .getTerminalOperationBrowse(this.requsetData, status)
      .subscribe((res) => {
        this.statusResult = res.data.status.result;
        this.browseResult = res.data.browse.result;
      });
  }
  onDateRangeChange(){
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllWarehouseOperation(0)
  }
}
