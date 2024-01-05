import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-reg',
    templateUrl: './customer-reg.component.html',
    styleUrls: ['./customer-reg.component.css'],
})
export class CustomerRegComponent implements OnInit {
    updateCustomerId?: string;

    customerRegForm: FormGroup = new FormGroup({
        customerNo: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
    });

    get customerNo() {
        return this.customerRegForm.get('customerNo');
    }

    get name() {
        return this.customerRegForm.get('name');
    }

    get address() {
        return this.customerRegForm.get('address');
    }

    get city() {
        return this.customerRegForm.get('city');
    }

    get state() {
        return this.customerRegForm.get('state');
    }

    get country() {
        return this.customerRegForm.get('country');
    }

    constructor(
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
            next: (params: ParamMap) => {
                let customerId = params.get('id');
                if (customerId) {
                    this.customerService
                        .getCustomerWithGetDoc(customerId)
                        .subscribe({
                            next: (data) => {
                                this.customerRegForm.patchValue(data);
                                this.updateCustomerId = data.id;
                            },
                        });
                }
            },
        });
    }

    submitRegForm() {
        if (!this.customerRegForm.invalid) {
            const newCustumer: CustomerModel = this.customerRegForm.value;

            if (this.updateCustomerId) {
                newCustumer.id = this.updateCustomerId;
                this.customerService.updateCustomer(newCustumer).subscribe({
                    complete: () => {
                        this.router.navigate(['customers']);
                    },
                });
            } else {
                this.customerService.addCustomer(newCustumer).subscribe({
                    next: (docRef) => {
                        console.log('Customer saved with ID: ', docRef['id']);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }
        }
    }
}
