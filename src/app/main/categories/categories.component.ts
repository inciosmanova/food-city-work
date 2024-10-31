import { Component, OnInit } from '@angular/core';
import { GetMenuData } from 'src/app/_models/global.interface';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  menu:GetMenuData[]=[]
  constructor(
    private globalService:GlobalService
  ){}
  ngOnInit(): void {
    this.getMenu()
  }



  getMenu(){
    this.globalService.getMenus().subscribe(
      res=>{
        const targetIds = [1162, 1163, 1164, 1165];

// İstenilen id değerlerine sahip olanları filtrele

// Geri kalanları filtrele
this.menu = res.data.filter(item => !targetIds.includes(item.id));
       }
    )
  }


}
