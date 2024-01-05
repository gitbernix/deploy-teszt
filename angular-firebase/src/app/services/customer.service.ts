import { Injectable } from '@angular/core';
import {
    DocumentData,
    Firestore,
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    docData,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from '@angular/fire/firestore';
import { CustomerModel } from '../models/customer.model';
import {
    BehaviorSubject,
    Observable,
    distinct,
    from,
    map,
    mergeMap,
    tap,
    toArray,
} from 'rxjs';
import { CustomerRegComponent } from '../components/customer/customer-reg/customer-reg.component';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    private readonly BASE_URL = environment.apiUrl;

    private timeBSub = new BehaviorSubject<string>('');

    timeObs$ = this.timeBSub.asObservable();

    private readonly customerCollectionRef = collection(
        this.firestore,
        'customers'
    );

    constructor(private firestore: Firestore) {
        console.log(`I'm from environment prod: ${environment.production}`);
        console.log(`Firebase appip: ${environment.firebase.appId}`);
    }

    //* Create
    addCustomer(customer: CustomerModel): Observable<DocumentData> {
        return from(addDoc(this.customerCollectionRef, customer));
    }

    //* Read all
    // folyamatos kapcsolat - sok olvasás
    getCustomers(): Observable<CustomerModel[]> {
        return collectionData(this.customerCollectionRef, {
            idField: 'id',
        }) as Observable<CustomerModel[]>;
    }

    // nem teremt folyamatos kapcsolatot, egyszeri olvasás
    getCustomersWithGetDocs(): Observable<CustomerModel[]> {
        return from(getDocs(this.customerCollectionRef)).pipe(
            map((snapshot) => {
                const resultList = snapshot.docs.map((doc) => {
                    const customerData: CustomerModel =
                        doc.data() as CustomerModel;
                    customerData.id = doc.id;
                    return customerData;
                });
                return resultList;
            })
        );
    }

    //* Read one
    // folyamatos kapcsolat

    getCustomer(id: string): Observable<CustomerModel> {
        const customerDoc = doc(this.firestore, `customers/${id}`);
        return docData(customerDoc, {
            idField: 'id',
        }) as Observable<CustomerModel>;
    }

    // egyszeri olvasás
    getCustomerWithGetDoc(id: string) {
        const customerDoc = doc(this.firestore, `customers/${id}`);
        return from(getDoc(customerDoc)).pipe(
            map((doc) => {
                const customerData: CustomerModel = doc.data() as CustomerModel;
                customerData.id = doc.id;
                return customerData;
            })
        );
    }

    //* DELETE
    deleteCustomer(customerId: string): Observable<void> {
        const customerDoc = doc(this.firestore, `customers/${customerId}`);
        return from(deleteDoc(customerDoc));
    }

    //* UPDATE
    updateCustomer(customer: CustomerModel): Observable<void> {
        const customerDoc = doc(this.firestore, 'customers/${customer.id}');
        return from(setDoc(customerDoc, customer));
    }

    //* Get values for filter property
    // getPropValues(prop: string): Observable<string[]> {
    //   return from(getDocs(this.customerCollectionRef)).pipe(
    //     map((snapshot) => {
    //       const resultList: string[] = [];
    //       snapshot.docs.forEach((doc) => {
    //         if ((doc.data() as CustomerModel).hasOwnProperty(prop)) {
    //           const value = doc.data()[prop];
    //           if (!resultList.includes(value)) resultList.push(value);
    //         }
    //       });
    //       return resultList;
    //     })
    //   );
    // }

    //* Get values for filter property with rxjs
    getPropValues(prop: string) {
        return from(getDocs(this.customerCollectionRef)).pipe(
            map((snapshot) => snapshot.docs.map((doc) => doc.data()[prop])),
            // tap((data) => console.log(data)),
            mergeMap((dataList) => dataList),
            // tap((data) => console.log(data)),
            distinct(),
            toArray()
            // tap((data) => console.log(data))
        );
    }

    getFilteredCustomers(
        prop: string,
        value: string
    ): Observable<CustomerModel[]> {
        const q = query(this.customerCollectionRef, where(prop, '==', value));
        return collectionData(q, { idField: 'id' }) as Observable<
            CustomerModel[]
        >;
    }
}
