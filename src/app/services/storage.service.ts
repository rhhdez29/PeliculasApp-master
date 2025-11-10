import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MovieDetail } from '../interfaces/movie.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localMovies: MovieDetail[] = [];
  private readonly MOVIES_KEY = 'movies';

  constructor(private storage: Storage) {
    this.init();
  }

  get movies() {
    return [...this._localMovies];
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadMovies();
  }

  async loadMovies() {
    try {
      const movies = await this._storage.get(this.MOVIES_KEY);
      this._localMovies = movies || [];
    } catch (error) {
      console.error(error);
    }
  }

  saveOrRemoveMovie(movie: MovieDetail) {
    const exists = this.existsMovieAtFavorites(movie?.id);
    if (exists) {
      // Then remove
      this._localMovies = this._localMovies.filter((m) => m.id !== movie.id);
    } else {
      // Then save
      this._localMovies.unshift(movie);
    }

    this._storage.set(this.MOVIES_KEY, this._localMovies);
  }

  existsMovieAtFavorites(id: number) {
    return this._localMovies.some((m) => m.id === id);
  }
}
