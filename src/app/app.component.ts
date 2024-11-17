import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FoodCity_Work';
  constructor(private location: Location) {}
  ngOnInit(): void {
    this.checkDeviceType();
  }


  checkDeviceType() {
    // Pencere genişliğine göre cihazı kontrol et
    if (window.innerWidth > 1024) {
      alert('Bu tətbiq yalnız mobil cihazlarda istifadə oluna bilər.');
      this.location.back();
      
    } else {
    }
  }

}





