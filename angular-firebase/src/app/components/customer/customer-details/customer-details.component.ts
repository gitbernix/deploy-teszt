import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
    public customer?: CustomerModel;

    constructor(
        private customerService: CustomerService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activateRoute.paramMap.subscribe({
            next: (params: ParamMap) => {
                let customerId = params.get('id');
                if (customerId) {
                    this.customerService
                        .getCustomerWithGetDoc(customerId)
                        .subscribe({
                            next: (data) => {
                                this.customer = data;
                            },
                        });
                }
            },
        });
    }

    onDeleteCustomer(id?: string): void {
        if (id && confirm(`Do you wanna delete customer id: ${id}?`)) {
            this.customerService.deleteCustomer(id).subscribe({
                complete: () => {
                    this.router.navigate(['customers']);
                },
            });
        }
    }

    onUpdateCustomer(id?: string) {
        if (id) {
            this.router.navigate(['customers', id, 'edit']);
        }
    }
}
