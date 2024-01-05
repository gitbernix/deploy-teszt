import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-filter',
    templateUrl: './customer-filter.component.html',
    styleUrls: ['./customer-filter.component.css'],
})
export class CustomerFilterComponent implements OnInit {
    customers: CustomerModel[] = [];
    filterProperties: string[] = ['city', 'state', 'country'];
    selectedFilterProps?: { type: string; placeholder: string };
    selectedPropValues$?: Observable<string[]>;
    @ViewChild('filterValue') private filterValue!: ElementRef;

    constructor(private customerService: CustomerService) {}

    ngOnInit(): void {
        this.customerService.getCustomersWithGetDocs().subscribe({
            next: (customers) => (this.customers = customers),
        });
    }

    selectFilterBy(event: any) {
        // console.log(event.value);
        this.selectedFilterProps = {
            type: `${event.value}`,
            placeholder: `Select ${event.value}`,
        };
        this.selectedPropValues$ = this.customerService.getPropValues(
            event.value
        );
        // this.customerService.getPropValues(event.value).subscribe();
    }

    filterCustomers(): void {
        if (this.selectedFilterProps) {
            const filterProp = this.selectedFilterProps.type;
            const filterValue = this.filterValue.nativeElement.value;
            this.customerService
                .getFilteredCustomers(filterProp, filterValue)
                .subscribe({
                    next: (customers: CustomerModel[]) => {
                        this.customers = customers;
                    },
                });
        }
    }
}
