import { Component, OnInit } from '@angular/core';
import { CompanyFormData } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-myinformation',
  templateUrl: './myinformation.component.html',
  styleUrls: ['./myinformation.component.scss'],
})
export class MyinformationComponent implements OnInit {
  companyData: CompanyFormData[] = [];
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    this.getCompanyData();
  }
  getCompanyData() {
    this.globalService.getCompanyData().subscribe((res) => {
      this.companyData = res.data;
    });
  }
}
