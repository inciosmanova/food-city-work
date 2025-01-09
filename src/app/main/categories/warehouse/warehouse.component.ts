import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
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
  length!: number
  pageSize!: number;
  printUrl: string = '/stockPrint/'
  pageSizeOptions: number[] = [10, 20, 50];
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
  onChangePage(pe: PageEvent) {
    this.requsetData.nextPageNumber = pe.pageIndex + 1
    this.requsetData.visibleItemCount = pe.pageSize
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
        this.length = res.data.count
        this.statusResult = res.data.status.result;
        this.browseResult = res.data.browse.result;
      });
  }
  onDateRangeChange(){
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllWarehouseOperation(this.status)
  }


  @ViewChild('printIframe') printIframe!: ElementRef<HTMLIFrameElement>;

  openPrint(id:number): void {

  
      if (this.printIframe && this.printIframe.nativeElement) {
        const iframeElement = this.printIframe.nativeElement;
      
        // Iframe'in görünürlüğünü etkinleştirme
 
      
        // Iframe içeriğini güncelleme
        iframeElement.src = `${this.printUrl}${id}`;
      
        iframeElement.onload = () => {
          try {
            // Iframe içeriğini yazdırma
            const iframeWindow = iframeElement.contentWindow;
            const iframeDocument = iframeWindow!.document;

            if (iframeWindow) {
              if (iframeDocument.readyState === 'complete') {
                iframeWindow.focus(); // Yazdırmadan önce odaklanma
                setTimeout(() => {
                  iframeWindow.print();
                }, 3000);
              // Yazdırma işlemini başlatma
                console.log('Yazdırma işlemi başlatıldı.');
                    } else {
                      this.openPrint(id);
                    }
            } else {
              console.error('Iframe penceresine erişim sağlanamadı.');
            }
          } catch (error) {
            console.error('Yazdırma sırasında bir hata oluştu:', error);
          }
        };
      } else {
        console.error('Iframe bulunamadı!');
      }
      
   



  }
}
