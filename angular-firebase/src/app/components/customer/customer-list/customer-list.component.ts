import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import {
    Observable,
    Subscriber,
    combineLatest,
    delay,
    from,
    map,
    merge,
    of,
    tap,
    timer,
    zip,
} from 'rxjs';

interface Car {
    type: string;
    year: number;
    isUsed: boolean;
}

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
    customers: CustomerModel[] = [];

    customers$!: Observable<CustomerModel[]>;

    // customObservable$ = new Observable<string>((subscriber) => {
    //   let count = 0;
    //   const intervalId = setInterval(() => {
    //     subscriber.next(`Érték: ${count}`);
    //     count++;
    //     if (count > 5) {
    //       subscriber.complete();
    //       clearInterval(intervalId);
    //     }
    //   }, 1000);
    // });

    // numberStream$ = of(1, 2, 3).pipe(delay(1000));
    numberStream$ = of(1, 2, 3);
    stringStream$ = of('a', 'b', 'c');

    mergedStream$ = zip(this.numberStream$, this.stringStream$).pipe(
        tap((value) => console.log(value))
    );

    newCars$ = of([
        { type: 'Tesla', year: 2021, isUsed: false },
        { type: 'Lexus', year: 2023, isUsed: false },
    ]);

    // newCars = [
    //   { type: "Tesla", year: 2021, isUsed: false },
    //   { type: "Lexus", year: 2023, isUsed: false },
    // ];

    // newCars$ = from(this.newCars);

    usedCars$ = of([
        { type: 'Suzuki', year: 2019, isUsed: true },
        { type: 'BMW', year: 2022, isUsed: true },
    ]);

    mergedCars$ = combineLatest([this.newCars$, this.usedCars$]).pipe(
        map(([newCars, usedCars]) => [...newCars, ...usedCars]),
        map((cars) => cars.sort((a, b) => a.year - b.year))
    );

    // usedCars = [
    //   { type: "Suzuki", year: 2019, isUsed: true },
    //   { type: "BMW", year: 2022, isUsed: true },
    // ];

    // usedCars$ = from(this.usedCars);

    // mergedCars$ = merge(this.newCars$, this.usedCars$).pipe(
    //   map((cars) => cars.sort((a, b) => a.year - b.year))
    // );

    // mergedCars$ = this.newCars$.pipe(
    //   merge(this.usedCars$),
    //   map((cars) => cars.sort((a: Car, b: Car) => a.year - b.year))
    // );

    // mergedStream$ = merge(this.numberStream$, this.stringStream$).pipe(
    //   tap((value) => console.log(value))
    // );

    // customers: CustomerModel[] = [
    //   {customerNo: 1, name: 'Rahuld Dravid', address: '', city: 'Banglaore', state: 'Karnataka', country: 'India'},
    //   {customerNo: 2, name: 'Sachin Tendulkar', address: '', city: 'Mumbai', state: 'Maharastra', country: 'India'},
    //   {customerNo: 3, name: 'Saurrav Ganguly', address: '', city: 'Kolkata', state: 'West Bengal', country: 'India'},
    //   {customerNo: 4, name: 'Mahendra Singh Dhoni', address: '', city: 'Ranchi', state: 'Bihar', country: 'India'},
    //   {customerNo: 5, name: 'Virat Kohli', address: '', city: 'Delhi', state: 'Delhi', country: 'India'},

    // ]

    constructor(
        private customerService: CustomerService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // this.time$ = timer(0, 1000).pipe(map(() => new Date().toLocaleTimeString));

        // this.time$.subscribe(
        //   next: (data) =>
        // )

        //* Collection data - folyamatos kapcsolat
        //   this.customerService.getCustomers().subscribe({
        //     next: (data: CustomerModel[]) => {
        //       this.customers = data;
        //     },
        //   });
        // }

        //* getdocs - csak manuális elindításra frissít
        this.customerService.getCustomersWithGetDocs().subscribe({
            next: (data: CustomerModel[]) => {
                this.customers = data;
            },
        });
    }

    onSelect(id?: string) {
        if (id) {
            this.router.navigate(['customers', id]);
        }
    }
}
