import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-production-ready-print',
  templateUrl: './production-ready-print.component.html',
  styleUrls: ['./production-ready-print.component.scss']
})
export class ProductionReadyPrintComponent implements OnInit, AfterViewInit {
  id: any;
  printMain: any;
  printOrder: any;
  products: any[] = [];
  materials: any[] = [];
  services: any[] = [];
  date!: Date;
  totalPages!: number;
  entryDocno:any

  @ViewChild('printContent') printContent!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.fetchProductionData();
  }

  ngAfterViewInit(): void {
    this.calculateContentPages();
  }

  /**
   * API'den üretim verilerini alır
   */
  private fetchProductionData(): void {
    this.activatedRoute.paramMap.pipe(take(2)).subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.globalService.getProductionReadyById(this.id).subscribe({
          next: (response) => {
            console.log("API Response:", response);
            if (response?.data) {
              this.printMain = response.data.main;
              this.products = response.data.products || [];
              this.materials = response.data.materials || [];
              this.services = response.data.services || [];
            } else {
              console.warn("API response boş döndü.");
            }
          },
          error: (error) => {
            console.error("API Hatası:", error);
          }
        });
      } else {
        console.warn("Rota parametresi 'id' alınamadı.");
      }
    });
  }

  /**
   * İçerik yüksekliği ve toplam sayfa sayısını hesaplar
   */
  private calculateContentPages(): void {
    if (!this.printContent) {
      console.warn("'printContent' bulunamadı.");
      return;
    }

    const contentHeight = this.printContent.nativeElement.scrollHeight; // İçeriğin toplam yüksekliği
    const pageHeight = 780; // A4 sayfa yüksekliği (piksel cinsinden)
    this.totalPages = Math.ceil(contentHeight / pageHeight);

    // Yükseklik çok küçükse bir sayfa eksilt
    if (contentHeight < 1440) {
      this.totalPages = Math.max(this.totalPages - 1, 1); // Minimum 1 sayfa olmalı
    }

    console.log("Toplam içerik yüksekliği:", contentHeight);
    console.log("Toplam sayfa sayısı:", this.totalPages);
  }
}
