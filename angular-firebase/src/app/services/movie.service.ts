import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    constructor(private httpclient: HttpClient) {}

    private readonly MOVIES_URL = 'http://localhost:3000/movies';

    getMovies(): Observable<Movie[]> {
        return this.httpclient.get<Movie[]>(this.MOVIES_URL);
    }

    saveMovie(movie: Movie): Observable<Movie> {
        let header: HttpHeaders = new HttpHeaders().set(
            'Content-Type',
            'application/json; charset=UTF-8'
        );
        return this.httpclient.post<Movie>(this.MOVIES_URL, movie, {
            headers: header,
        });
    }

    deleteMovie(id: number): Observable<Object> {
        return this.httpclient.delete<Object>(`${this.MOVIES_URL}/${id}`);
    }
}
