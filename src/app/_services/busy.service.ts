import { Injectable } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount =0;
  constructor(private spinner: SpinnerVisibilityService) { }

  busy(){
    this.busyRequestCount++;
    this.spinner.show();
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount<= 0){
      this.busyRequestCount=0;      
      this.spinner.hide();
    }
  }




}
