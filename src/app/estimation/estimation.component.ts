import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css'],
})
export class EstimationComponent implements OnInit {

  validationErrors: string[] = [];
  @Output() cancelEstimation = new EventEmitter();
  estimationForm: FormGroup;
  user: User;

  constructor(
    private http: HttpClient,
    private membersService: MembersService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.initializeForm();
    this.getDiscountPercentage();
  }

  initializeForm() {
    this.estimationForm = this.fb.group({
      goldPrice: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      totalPrice: [''],
      discount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  printToPaper() {
    this.toaster.error('Not Implemented exception');
  }
  printToFile() {
    if (this.estimationForm.valid) {
      this.membersService
        .downloadEstimation(this.estimationForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            var binaryData = [];
            binaryData.push(response);
            var url = window.URL.createObjectURL(
              new Blob(binaryData, { type: 'application/pdf' })
            );
            // to open in new tab
            //  window.open(url);
            saveAs(url, 'estimation.pdf');
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  close() {
    this.toaster.error('Not Implemented exception');
    //this.cancelEstimation.emit(false);
  }
  calculate() {
    if (this.estimationForm.valid) {
      var gross =
        this.estimationForm.value.goldPrice * this.estimationForm.value.weight;
      var totalDiscount = (gross * this.estimationForm.value.discount) / 100;
      var total = gross - totalDiscount;
      this.estimationForm.patchValue({ totalPrice: total });
    }
  }
  printToScreen() {
    this.toaster.error('Not Implemented exception');
  }

  getDiscountPercentage() {
    console.log(this.user);
    if (this.user.isPriviledge === false) return;
    this.membersService.getDicountPercentage().subscribe(
      (response: number) => {
        this.estimationForm.patchValue({
          discount: response,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public toFormControl(point: AbstractControl): AbstractControl {
    return point;
  }
}
