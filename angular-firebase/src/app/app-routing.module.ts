import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CustomerRegComponent } from './components/customer/customer-reg/customer-reg.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailsComponent } from './components/customer/customer-details/customer-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CustomerFilterComponent } from './components/customer/customer-filter/customer-filter.component';
import { MovieRegistrationComponent } from './components/movies/movie-registration/movie-registration.component';
import { MovieListingComponent } from './components/movies/movie-listing/movie-listing.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'registration', component: CustomerRegComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'filter', component: CustomerFilterComponent },
    {
        path: 'customers',
        component: CustomerComponent,
        children: [
            { path: ':id', component: CustomerDetailsComponent },
            { path: ':id/edit', component: CustomerRegComponent },
        ],
    },
    { path: 'movieform', component: MovieRegistrationComponent },
    { path: 'movielist', component: MovieListingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
