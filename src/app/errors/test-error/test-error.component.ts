import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseUrl = "https://localhost:5001/api/";
  validationErrors: string[] =[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  get404Error(){
    this.http.get(this.baseUrl+"buggy/not-found").subscribe( response =>{
      console.log(response);
    }, err=>{
      console.log(err)
    })
  }
  getPdf(){
    this.http.get(this.baseUrl+"buggy/export",{
      responseType: 'arraybuffer'
    }).subscribe( response =>{
      console.log(response);
      var binaryData = [];
      binaryData.push(response);
      var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
      // to open in new tab
      //  window.open(url);
      saveAs(url,"fileone.pdf")
    }, err=>{
      console.log(err)
    })
  }
  get400ValidationError(){
    this.http.post(this.baseUrl+"account/register",{}).subscribe( response =>{
      console.log(response);
    }, err=>{
      this.validationErrors = err;
      console.log(err)
    })
  }
  get400Error(){
    this.http.get(this.baseUrl+"buggy/bad-request").subscribe( response =>{
      console.log(response);
    }, err=>{
      console.log(err)
    })
  }
  get500Error(){
    this.http.get(this.baseUrl+"buggy/server-error").subscribe( response =>{
      console.log(response);
    }, err=>{
      console.log(err)
    })
  }
  get401Error(){
    this.http.get(this.baseUrl+"buggy/auth").subscribe( response =>{
      console.log(response);
    }, err=>{
      console.log(err)
    })
  }

}
