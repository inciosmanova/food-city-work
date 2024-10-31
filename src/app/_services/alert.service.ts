import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AlertService {
 

  constructor() {
  }

  errorService(text:string){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: text,
      });
  }


}