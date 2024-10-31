import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResult } from '../_models/login.interface';
import { OperationRootData, GetMenuRoot, TableRequestModel, DailyRootData, DailyRoot, CompanyForm, ContractRoot, InvoicesRoot, SubTypeRoot, TerminalRoot, OrderRoot } from '../_models/global.interface';



@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl!: string;
  refToken?: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.globalUrl
  }
  

  getMenus(): Observable<GetMenuRoot> {
    return this.http.get<GetMenuRoot>(this.baseUrl + `GetMenus`)
  }


  getAllWarehouseOperation(filter : TableRequestModel,status:number): Observable<OperationRootData> {
    return this.http.post<OperationRootData>(this.baseUrl + `GetAllWarehouseOperation?status=${status}`,filter )
  }

  getAllWarehouseOperationDaily(filter : TableRequestModel): Observable<DailyRoot> {
    return this.http.post<DailyRoot>(this.baseUrl + `GetAllWarehouseOperationDaily`,filter)
  }

  getCompanyData(): Observable<CompanyForm> {
    return this.http.get<CompanyForm>(this.baseUrl + `GetCompanyData`)
  }

  getContractByCompany(): Observable<ContractRoot> {
    return this.http.get<ContractRoot>(this.baseUrl + `GetContractByCompany`)
  }

  getAllInvoices(filter : TableRequestModel,orderType:number,subType:number): Observable<InvoicesRoot> {
    return this.http.post<InvoicesRoot>(this.baseUrl + `GetAllInvoices?orderType=${orderType}&subType=${subType}`,filter)
  }

  getTerminalOperationBrowse(filter : TableRequestModel,status:number): Observable<TerminalRoot> {
    return this.http.post<TerminalRoot>(this.baseUrl + `GetTerminalOperationBrowse?status=${status}`,filter)
  }
  getAllOrdersBrowseMobile(filter : TableRequestModel,orderType:number,status:number): Observable<OrderRoot> {
    return this.http.post<OrderRoot>(this.baseUrl + `GetAllOrdersBrowseMobile?orderType=${orderType}&status=${status}`,filter)
  }

  getSpeCodeByType(type:string): Observable<SubTypeRoot> {
    return this.http.get<SubTypeRoot>(this.baseUrl + `GetSpeCodeByType?type=${type}`)
  }
}