import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerRegComponent } from './components/customer/customer-reg/customer-reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailsComponent } from './components/customer/customer-details/customer-details.component';
import { NameListComponent } from './components/main/name-list/name-list.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CustomerFilterComponent } from './components/customer/customer-filter/customer-filter.component';
import { MovieRegistrationComponent } from './components/movies/movie-registration/movie-registration.component';
import { MovieListingComponent } from './components/movies/movie-listing/movie-listing.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        NavComponent,
        CustomerListComponent,
        CustomerRegComponent,
        CustomerComponent,
        CustomerDetailsComponent,
        NameListComponent,
        SignInComponent,
        CustomerFilterComponent,
        MovieRegistrationComponent,
        MovieListingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,

        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
