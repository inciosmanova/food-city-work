import { Component, OnInit } from '@angular/core';
import { ContractRootData } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-mycontracts',
  templateUrl: './mycontracts.component.html',
  styleUrls: ['./mycontracts.component.scss'],
})
export class MycontractsComponent implements OnInit {
  data: ContractRootData[] = [];
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    this.getContractByCompany()
  }
  getContractByCompany() {
    this.globalService.getContractByCompany().subscribe((res) => {
      this.data = res.data;
    });
  }
}
