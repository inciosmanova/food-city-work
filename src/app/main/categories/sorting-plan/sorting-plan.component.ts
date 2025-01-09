import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  TableRequestModel,
  OrderResult,
  OrderResult2,
} from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';
import { ConfirmtextComponent } from '../../mmf/confirmtext/confirmtext.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-sorting-plan',
  templateUrl: './sorting-plan.component.html',
  styleUrls: ['./sorting-plan.component.scss'],
})
export class SortingPlanComponent {
  length!: number;
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
  readonly dialog = inject(MatDialog);
  printUrlEntry: string = '/entryPrint/';
  printUrlReady: string = '/readyPrint/';

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
  status: number = 3;

  constructor(private globalService: GlobalService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    this.getAllOrdersBrowseMobile(this.status);
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
    this.status = status;
    this.globalService
      .getProductionDocsBrowseData(this.requsetData, 9, status)
      .subscribe((res) => {
        this.length = res.data.browse.count;
        this.statusResult = res.data.status.result;
        this.browseResult = res.data.browse.result;
      });
  }
  onDateRangeChange() {
    this.requsetData.beginDate = this.dateFilter.value.beginDate;
    this.requsetData.endDate = this.dateFilter.value.endDate;
    this.getAllOrdersBrowseMobile(this.status);
  }
  onChangePage(pe: PageEvent) {
    this.requsetData.nextPageNumber = pe.pageIndex + 1;
    this.requsetData.visibleItemCount = pe.pageSize;
    this.getAllOrdersBrowseMobile(this.status);
  }
  @ViewChild('printIframe') printIframe!: ElementRef<HTMLIFrameElement>;

  openPrint(docNo: string,id:number): void {
       const text = docNo;
    const match = text.substring(0, 2);
  // 3 saniye sonra çalışır
  
    if (match== 'PE') {
      if (this.printIframe && this.printIframe.nativeElement) {
        const iframeElement = this.printIframe.nativeElement;
      
        // Iframe'in görünürlüğünü etkinleştirme
 
      
        // Iframe içeriğini güncelleme
        iframeElement.src = `${this.printUrlEntry}${id}`;
      
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
                    } else {
                      this.openPrint(docNo,id);
                    }
            } else {
            }
          } catch (error) {
          }
        };
      } else {
      }
      
    } else if(match == 'RP') {
      if (this.printIframe && this.printIframe.nativeElement) {
        const iframeElement = this.printIframe.nativeElement;
      
        // Iframe'in görünürlüğünü etkinleştirme
      
        // Iframe içeriğini güncelleme
        iframeElement.src = `${this.printUrlReady}${id}`;
      
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
                    } else {
                      this.openPrint(docNo,id);
                    }
     
            } else {
            }
          } catch (error) {
          }
        };
      } else {
      }
      
    }



  }
  // openPrint(docNo: any) {
  //   const text = docNo;
  //   const match = text.substring(0, 2);
  //   if (match== 'PE') {
  //     var frame = document.getElementById('entry_frame') as any;
  //     const iframeWindow = frame!.contentWindow;
  //     const iframeDocument = iframeWindow!.document;
  //     if (iframeDocument.readyState === 'complete') {
  //       iframeWindow.focus();
  //       iframeWindow.print();
  //     } else {
  //       this.openPrint(docNo);
  //     }
  //   } else if(match == 'RP') {
  //     var frame = document.getElementById('ready_frame') as any;
  //     const iframeWindow = frame!.contentWindow;
  //     const iframeDocument = iframeWindow!.document;
  //     if (iframeDocument.readyState === 'complete') {
  //       iframeWindow.focus();
  //       iframeWindow.print();
  //     } else {
  //       this.openPrint(docNo);
  //     }
  //   }
  // }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmtextComponent);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
