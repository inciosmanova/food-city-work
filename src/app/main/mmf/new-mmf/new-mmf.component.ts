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
  id: any=0;
  getForm: any;
  getServices: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {
    const navigation = this.router.getCurrentNavigation();
    Number(navigation?.extras.state) >0 ?this.id = navigation?.extras.state : this.id=0;
  }
  ngOnInit() {
    this.createForm();
    this.getContractsWithOrdersByCompany();
    this.getPackTypes();
    this.typeOfVehicles();
    let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.form.patchValue({ executionDate: today });
    this.form.patchValue({ date: today });
    this.id > 0 ? this.getById() : this.addItem();
    this.getToken();
  }
  getById() {
    this.globalService.getCompanyApplicationById(this.id).subscribe((res) => {
      console.log(res);
      this.getForm = res.data.main;
      this.getServices = res.data.services;
      this.selectType(this.getForm.contractId, 'contract');
      this.selectType(this.getForm.warehouseId, 'warehouse');
      this.createForm();
      this.getServices.map((res: any) => {
        const itemForm = this.fb.group({
          id: [res.id], // Form control adı
          serviceId: [res.serviceId],
          status: [true], // Form control miktarı
        });
        this.items.push(itemForm);
      });
      
      this.form.patchValue({
        servicegroupId: this.servicegroups[0].servicegroupId,
      });
      this.form.patchValue({
        servicegroupName: this.servicegroups[0].servicegroupName,
      });
    });
  }
  getContractsWithOrdersByCompany() {
    this.globalService.getContractsWithOrdersByCompany().subscribe((res) => {
      this.contracts = res.data;
    });
  }

  selectType(key: any, type: string) {
    if (type == 'contract') {
      this.globalService.getContractById(key).subscribe((res) => {
        let servicegroups: any = [];
        
        servicegroups.push({
          serviceGroupId: res.data.main.orderTypeId,
          serviceGroupName: res.data.main.orderType,
        });

        this.servicegroups = servicegroups;
        
        this.form.patchValue({
          servicegroupId: this.servicegroups[0].serviceGroupId,
        });
        this.form.patchValue({
          servicegroupName: this.servicegroups[0].serviceGroupName,
        });
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
    this.globalService.getTransportTypes().subscribe((res) => {
      this.vehicles = res.data;
    });
  }

  getToken() {
    let fullName = localStorage.getItem('fullName');
    let companyId = Number(localStorage.getItem('companyId'));
    let companyName = localStorage.getItem('companyName');
    this.form.patchValue({ companyName: companyName });
    this.form.patchValue({ companyId: companyId });
    this.form.patchValue({ fullName: fullName });
  }
  createForm() {
    this.form = this.fb.group({
      id: [this.getForm?.id || 0],
      date: [this.getForm?.date || ''],
      docNo: [this.getForm?.docNo || ''],
      orderId: [this.getForm?.orderId || '', Validators.required],
      fullName: [localStorage.getItem('fullName') || '', Validators.required],
      executionDate: [
        this.datePipe.transform(this.getForm?.executionDate, 'yyyy-MM-dd') ||
          '',
        Validators.required,
      ],
      companyId: [this.getForm?.companyId || '', Validators.required],
      companyName: [this.getForm?.companyName || ''],
      contractId: [this.getForm?.contractId || '', Validators.required],
      paymentDescription: [this.getForm?.paymentDescription || ''],
      orderSubOperationTypeId: [
        this.getForm?.orderSubOperationTypeId || '',
        Validators.required,
      ],
      cargoId: [this.getForm?.cargoId || '', Validators.required],
      quantity: [this.getForm?.quantity || '', Validators.required],
      warehouseId: [this.getForm?.warehouseId || '', Validators.required],
      warehouseDoorId: [
        this.getForm?.warehouseDoorId || '',
        Validators.required,
      ],
      warehouseCameraId: [
        this.getForm?.warehouseCameraId || '',
        Validators.required,
      ],
      packTypeId: [this.getForm?.packTypeId || '', Validators.required],
      servicegroupId: [this.getForm?.servicegroupId || '', Validators.required],
      transportType: [this.getForm?.transportType || '', Validators.required],
      truckPlateNo: [this.getForm?.truckPlateNo || '', Validators.required],
      description: [this.getForm?.description || ''],
      statusId: [this.getForm?.statusId || 1],
      services: this.fb.array([]),
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
    if (this.form.valid) {
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
}
