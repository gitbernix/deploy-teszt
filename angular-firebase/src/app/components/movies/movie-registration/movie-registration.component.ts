import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ValidatorFn,
    Validators,
    FormGroup,
    ValidationErrors,
} from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieListingComponent } from '../movie-listing/movie-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-movie-registration',
    templateUrl: './movie-registration.component.html',
    styleUrls: ['./movie-registration.component.css'],
})
export class MovieRegistrationComponent implements OnInit {
    movieForm!: FormGroup;

    movieTypeOptions: { key: string; value: string }[] = [
        { key: 'SCI-FI', value: 'Sci-fi' },
        { key: 'COMEDY', value: 'Comedy' },
        { key: 'THRILLER', value: 'Thriller' },
        { key: 'FANTASY', value: 'Fantasy' },
        { key: 'DRAMA', value: 'Drama' },
        { key: 'CRIME', value: 'Crime' },
        { key: 'ADVENTURE', value: 'Adventure' },
        { key: 'HORROR', value: 'Horror' },
        { key: 'ACTION', value: 'Action' },
        { key: 'OTHER', value: 'Other' },
    ];

    movies: Movie[] = [];
    constructor(private movieserv: MovieService) {}

    ngOnInit(): void {
        this.movieForm = new FormGroup({
            movieName: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
            director: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z]{3,20}$/), //pattern validátor, csak betűk lehetnek, 3-20 karakterhosszúságban
            ]),
            duration: new FormControl(null, [
                Validators.required,
                Validators.min(10),
                Validators.max(350),
            ]),
            releaseDate: new FormControl(null, [
                Validators.required,
                Validators.min(1970),
                Validators.max(2023),
            ]),
            movieType: new FormControl(''),
            country: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
            ]),
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(20),
                Validators.maxLength(800),
                this.pornValidator(),
            ]),
        });
    }

    get movieName(): AbstractControl | null {
        return this.movieForm.get('movieName');
    }

    get director(): AbstractControl | null {
        return this.movieForm.get('director');
    }

    get duration(): AbstractControl | null {
        return this.movieForm.get('duration');
    }

    get releaseDate(): AbstractControl | null {
        return this.movieForm.get('releaseDate');
    }

    get movieType(): AbstractControl | null {
        return this.movieForm.get('movieType');
    }

    get country(): AbstractControl | null {
        return this.movieForm.get('country');
    }

    get description(): AbstractControl | null {
        return this.movieForm.get('description');
    }

    getMovies(): void {
        this.movieserv.getMovies().subscribe({
            next: (movies: Movie[]) => {
                this.movies = movies;
            },
            error: (err) => console.log(err),
            complete: () => {
                console.log('These are the movies!');
            },
        });
    }

    saveMovie() {
        const newMovie: Movie = {
            movieName: this.movieForm.get('movieName')?.value,
            director: this.movieForm.get('director')?.value,
            duration: this.movieForm.get('duration')?.value,
            releaseDate: this.movieForm.get('releaseDate')?.value,
            movieType: this.movieForm.get('movieType')?.value,
            country: this.movieForm.get('country')?.value,
            description: this.movieForm.get('description')?.value,
        };
        this.movieserv.saveMovie(newMovie).subscribe({
            complete: () => {
                console.log('Movie added!', newMovie);
                this.getMovies();
                this.movieForm.reset();
            },
        });
    }

    deleteMovie(id?: number) {
        id = Number(id);
        this.movieserv.deleteMovie(id).subscribe({
            complete: () => {
                console.log('Movie deleted!');
                this.getMovies();
            },
        });
    }

    //Egyedi validátor:
    pornValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const hasPorn = (control.value as string).match(/porn/i);
            return hasPorn ? { customError: { value: control.value } } : null;
        };
    }
}
