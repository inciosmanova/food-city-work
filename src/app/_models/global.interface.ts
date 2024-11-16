export interface GetMenuRoot {
  data: GetMenuData[];
  message: string;
  statusCode: number;
  status: boolean;
}

export interface GetMenuData {
  id: number;
  value: string;
  parentId: any;
  subMenuExistStatus: boolean;
  menuType: number;
  icon: string;
  link: string;
  orderBy: number;
  subObject: any;
}

export interface TableRequestModel {
  currentPageName: string;
  exportToExcel: boolean;
  nextPageNumber: number;
  visibleItemCount: number;
  filters: FilterModel[];
  beginDate: any;
  endDate: any;
}

export interface FilterModel {
  columnName: string;
  // filterType: string;
  value: string;
  order: number;
}

export interface OperationRoot {
  data: OperationRootData;
  message: string;
  statusCode: number;
  status: boolean;
}

export interface OperationRootData {
  data: any;
  status: OperationRootStatus;
  browse: OperationRootBrowse;
}

export interface OperationRootStatus {
  result: OperationRootResult[];
  count: number;
}

export interface OperationRootResult {
  id: number;
  value: string;
  count: number;
}

export interface OperationRootBrowse {
  result: OperationRootResult2[];
  count: number;
}

export interface OperationRootResult2 {
  id: number;
  docNo: string;
  contractType: string;
  orderNo: string;
  date: string;
  plannedExecutionDate: any;
  truckplate: string;
  weights: number;
  plenipotentiary: any;
  warehouse: string;
  dataStatus: string;
  dataStatusId: number;
  companyName: string;
}

export interface DailyRoot {
  data: DailyRootData;
  message: string;
  statusCode: number;
  status: boolean;
}

export interface DailyRootData {
  result: DailyRootResult[];
  count: number;
}

export interface DailyRootResult {
  id: number;
  date: string;
  docNo: string;
  operationType: string;
}

export interface CompanyForm {
  data: CompanyFormData[];
  message: string;
  statusCode: number;
  status: boolean;
}

export interface CompanyFormData {
  id: number;
  ctype: string;
  ptype: string;
  code: string;
  financeCode: string;
  railwayCode: string;
  name: string;
  voen: string;
  address: string;
  phone: string;
  limit: number;
  block: string;
  userName: string;
  createDate: string;
  director: string;
  isBlock: boolean;
}

export interface ContractRoot {
  data: ContractRootData[];
  message: string;
  statusCode: number;
  status: boolean;
}

export interface ContractRootData {
  id: number;
  contractType: string;
  beginDate: string;
  endDate: string;
  monthDifference: number;
  director: string;
  orderDetails: string;
  downloadKeys: any;
}

export interface InvoicesRoot {
  data: InvoicesRootData;
  message: string;
  statusCode: number;
  status: boolean;
}

export interface InvoicesRootData {
  paymentStatuses: InvoicesPaymentStatus[];
  statusWithCount: InvoicesStatusWithCount[];
  browse: InvoicesBrowse;
}

export interface InvoicesPaymentStatus {
  count: any;
  key: number;
  value: string;
}

export interface InvoicesStatusWithCount {
  count: number;
  status: string;
  paymentStatusId: number;
}

export interface InvoicesBrowse {
  result: InvoicesResult[];
  count: number;
}

export interface InvoicesResult {
  id: number;
  day: number;
  lastPaymentDate: string;
  contractType: string;
  orderNo: string;
  cargos: any;
  docNo: string;
  date: string;
  orderByCreateDate: string;
  orderByDate: string;
  companyName: string;
  companyId: number;
  totalAmount: number;
  finalAmount: number;
  truckCount: number;
  statusValue: string;
  status: number;
  createDate: string;
  truckPlate: string;
  operationReasons: string;
  paymentStatus: string;
  paymentStatusId: number;
  paidAmount: number;
}

export interface SubTypeRoot {
  data: SubTypeRootData[];
  message: string;
  statusCode: number;
  status: boolean;
}

export interface SubTypeRootData {
  key: number;
  value: string;
}

export interface TerminalRoot {
  data: TerminalData;
  message: string;
  statusCode: number;
  status: boolean;
}

export interface TerminalData {
  status: TerminalStatus;
  browse: TerminalBrowse;
}

export interface TerminalStatus {
  result: TerminalResult[];
  count: number;
}

export interface TerminalResult {
  id: number;
  value: string;
  count: number;
}

export interface TerminalBrowse {
  result: TerminalResult2[];
  count: number;
}

export interface TerminalResult2 {
  docNo: any;
  id: number;
  contractType: any;
  orderNo: any;
  date: string;
  plannedExecutionDate: any;
  truckplate: string;
  trailerplate: string;
  terminalEntryDate: any;
  terminalExitDate: any;
  extraWeight: number;
  ydm: string;
  scalesIndicator: number;
  createUser: string;
  statusId:number
}




export interface OrderRoot {
  data: OrderData
  message: string
  statusCode: number
  status: boolean
}

export interface OrderData {
  status: OrderStatus
  browse: OrderBrowse
}

export interface OrderStatus {
  result: OrderResult[]
  count: number
}

export interface OrderResult {
  id: number
  value: string
  count: number
}

export interface OrderBrowse {
  result: OrderResult2[]
  count: number
}

export interface OrderResult2 {
docNo: any;
  id: number
  date: string
  plannedExecutionDate: string
  orderNo: string
  orderType: string
  statusValue: string
  statusId: number
  warehouseName: string
  warehouseDoorName: string
  typeOfVehicle: string
  truckplate: string
  warehouseDocNo: any
}
