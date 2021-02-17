import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Chat app';
  users: any;

  constructor( private accountService : AccountService){}
  
  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    var data = localStorage.getItem("user");
    const user: User  = (data === null || data === "undefined")
        ? undefined 
        : JSON.parse(localStorage.getItem("user") ||'{}') ; 
    this.accountService.setCurrentUser(user);
  }
}
