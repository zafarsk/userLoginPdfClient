import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor( private accountService: AccountService,
    private toastr: ToastrService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      userName: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required,this.compareControlString("password")]]
    });
  }

  compareControlString(controlName: string): ValidatorFn{
    return ( control: AbstractControl) =>{
      return control?.value === control?.parent?.controls[controlName].value 
              ? null : {isFailed: true};
    };
  }

  register(){
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response =>{
      this.router.navigateByUrl("/estimation");
    },err=>{
      console.log(err);
      this.validationErrors = err;
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  public toFormControl(point: AbstractControl): AbstractControl {
    return point;
  }

  // public toFormControl(point: AbstractControl): FormControl {
  //   return point as FormControl;
  // }

}
