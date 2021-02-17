import { Injectable } from '@angular/core';
import swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {

      if (result.isConfirmed) {
        okCallback();
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    })
  }

  success(message: string) {
    swal.fire({
      title: "success",
      text: message,
      icon: "success",
    });
  }

  error(message: string) {
    swal.fire({
      title: "error",
      text: message,
      icon: "error",
    });
  }

  warning(message: string) {
    swal.fire({
      title: "warning",
      text: message,
      icon: "warning",
    });
  }

  info(message: string) {
    swal.fire({
      title: "info",
      text: message,
      icon: "info",
    });
  }

}
