import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { MovieRegistrationComponent } from '../movie-registration/movie-registration.component';
import { AbstractControl } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-movie-listing',
    templateUrl: './movie-listing.component.html',
    styleUrls: ['./movie-listing.component.css'],
})
export class MovieListingComponent {
    movieForm!: FormGroup;
    movies: Movie[] = [];
    constructor(private movieserv: MovieService) {}

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
            next: () => {
                console.log('Movie added!', newMovie);
                this.getMovies();
                this.movieForm.reset();
            },
            error: (err) => {
                console.error('Error adding movie:', err);
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
}
