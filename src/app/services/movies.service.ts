import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  GenresResponse,
  Movie,
  MovieCredits,
  MovieDetail,
  MoviesResponse,
} from '@interfaces';

const api_url = environment.MDB_API;
const api_key = environment.API_KEY;
const language = 'es';
const include_image_language = 'es';
const today = new Date();
const month = today.getMonth() + 1;
const last_day = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
).getDate();

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _popularsPage = 0;
  private _popularMovies = new BehaviorSubject<Movie[]>([]);
  public popularMovies$ = this._popularMovies.asObservable();

  private _latestMovies = new BehaviorSubject<Movie[]>([]);
  public latestMovies$ = this._latestMovies.asObservable();

  constructor(private _http: HttpClient) {}

  private get popularMovies() {
    return this._popularMovies.value;
  }

  resetPopularMovies() {
    this._popularsPage = 0;
    this._popularMovies.next([]);
  }

  getLatestMovies() {
    let currentMonth;
    if (month < 10) {
      currentMonth = `0${month}`;
    } else {
      currentMonth = month;
    }
    const fromDate = `${today.getFullYear()}-${currentMonth}-01`;
    const toDate = `${today.getFullYear()}-${currentMonth}-${last_day}`;
    return this._executeQuery<MoviesResponse>(
      `/discover/movie?primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}`
    ).pipe(tap(({ results }) => this._latestMovies.next(results)));
  }

  getPopularMovies() {
    this._popularsPage++;
    return this._executeQuery<MoviesResponse>(
      `/discover/movie?sort_by=popularity.desc&page=${this._popularsPage}`
    ).pipe(tap(({ results }) => this._nextPopularMovies(results)));
  }

  getMovieDetail(id: number) {
    return this._executeQuery<MovieDetail>(`/movie/${id}`);
  }

  getMovieCredits(id: number) {
    return this._executeQuery<MovieCredits>(`/movie/${id}/credits`);
  }

  searchMovies(search: string) {
    return this._executeQuery<MoviesResponse>(`/search/movie?query=${search}`);
  }

  getGenres() {
    return this._executeQuery<GenresResponse>(`/genre/movie/list`).pipe(
      map(({ genres }) => genres)
    );
  }

  private _executeQuery<T>(query: string) {
    return this._http.get<T>(`${api_url}${query}`, {
      params: {
        api_key,
        language,
        include_image_language,
      },
    });
  }

  private _nextPopularMovies(movies: Movie[]) {
    this._popularMovies.next([...this.popularMovies, ...movies]);
  }
}
