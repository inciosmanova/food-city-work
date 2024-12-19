import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-new-mmf',
  templateUrl: './new-mmf.component.html',
  styleUrls: ['./new-mmf.component.scss'],
})
export class NewMmfComponent {
  reasonType: any;

  form!: FormGroup;
  contracts: any;
  servicegroups: any;
  services: any;
  packTypes: any;
  contractOrders: any;
  contractWarehouses: any;
  vehicles: any;
  warehouseDoors: any;
  message: string = '';
  id:any
  getForm:any
  getServices:any
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private alertService: AlertService,
    private datePipe: DatePipe,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.id = navigation?.extras.state;
  }
  ngOnInit() {
    this.createForm();
    this.getToken();
    this.getContractsWithOrdersByCompany();
    this.getPackTypes();
    this.typeOfVehicles();

    this.id>0? this.getById():''
  }
  getById(){
     this.globalService.getCompanyApplicationById(this.id).subscribe(res=>{
      console.log(res);
      this.getForm=res.data.main
      this.getServices=res.data.services
      this.selectType(this.getForm.contractId,'contract')
      this.selectType(this.getForm.warehouseId,'warehouse')
     })
  }
  getContractsWithOrdersByCompany() {
    this.globalService.getContractsWithOrdersByCompany().subscribe((res) => {
      this.contracts = res.data;
    });
  }

  selectType(key: any, type: string) {
    if (type == 'contract') {
      this.globalService.getContractById(key).subscribe((res) => {
        this.servicegroups = res.data.specialOffers;
        this.contractOrders = res.data.contractOrders;
        this.services = res.data.contractServices;
        this.contractWarehouses = res.data.contractWarehouses;
      });
    } else {
      this.globalService.getWarehouseDoor(key, 0).subscribe((res) => {
        this.warehouseDoors = res.data;
      });
    }
  }

  getPackTypes() {
    this.globalService.getPackTypes().subscribe((res) => {
      this.packTypes = res.data;
    });
  }

  typeOfVehicles() {
    this.globalService
      .getTransportTypes()
      .subscribe((res) => {
        this.vehicles = res.data;
      });
  }

  getToken() {
    let fullName = localStorage.getItem('fullName');
    let companyId = Number(localStorage.getItem('companyId'));
    let companyName = localStorage.getItem('companyName');
    let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.form.patchValue({ companyName: companyName });
    this.form.patchValue({ companyId: companyId });
    this.form.patchValue({ fullName: fullName });
    this.form.patchValue({ executionDate: today });
    this.form.patchValue({ date: today });
  }
  createForm() {
    this.form = this.fb.group({
      id: [0, Validators.required],
      date: ['', Validators.required],
      docNo: ['', Validators.required],
      orderId: ['', Validators.required],
      fullName: ['', Validators.required],
      executionDate: ['', Validators.required],
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
      contractId: ['', Validators.required],
      paymentDescription: ['', Validators.required],
      orderSubOperationTypeId: ['', Validators.required],
      cargoId: ['', Validators.required],
      quantity: ['', Validators.required],
      warehouseId: ['', Validators.required],
      warehouseDoorId: ['', Validators.required],
      warehouseCameraId: ['', Validators.required],
      packTypeId: ['', Validators.required],
      servicegroupId: ['', Validators.required],
      transportType: ['', Validators.required],
      truckPlateNo: ['', Validators.required],
      description: ['', Validators.required],
      statusId: [1, Validators.required],
      services: this.fb.array([
        this.fb.group({
          id: [0], // Form control adı
          serviceId: [''],
          status: [true], // Form control miktarı
        }),
      ]),
    });
  }
  get items(): FormArray {
    return this.form.get('services') as FormArray;
  }

  addItem(): void {
    const itemForm = this.fb.group({
      id: [0], // Form control adı
      serviceId: [''],
      status: [true], // Form control miktarı
    });
    this.items.push(itemForm);
  }
  removeItem(index: number): void {
    const item = this.items.at(index); // İlgili elemanı bul
    item.patchValue({ status: false }); // Status değe
    // this.items.removeAt(index);
    console.log(this.form);
  }
  back() {
    this.router.navigate(['/modules/main/mmf']);
  }
  submit() {
    console.log(this.form.value);
    this.globalService
      .addOrUpdateCompanyApplication(this.form.value)
      .subscribe({
        next: (result: any) => {
          this.alertService.succesService(result.message);
          this.router.navigate(['/modules/main/mmf']);

        },
        error: (res: any) => {
          this.alertService.errorService(res.message);
        },
      });
  }
}
