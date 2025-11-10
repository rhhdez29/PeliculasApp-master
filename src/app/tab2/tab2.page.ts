import { Component, OnInit } from '@angular/core';
import { MoviesService } from '@services';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Movie } from '../interfaces/movie.interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  populars$: Observable<Movie[]>;
  search = '';
  isSearching = false;

  movies: Movie[] = [];

  constructor(private _moviesService: MoviesService) {
    this._moviesService.resetPopularMovies();
  }

  ngOnInit(): void {
    this.populars$ = this._moviesService.popularMovies$;
    this._moviesService.getPopularMovies().subscribe();
  }

  onSearchChange(event) {
    this.isSearching = true;
    const search = event.detail.value;
    if (search.length > 0) {
      this._moviesService
        .searchMovies(search)
        .pipe(finalize(() => (this.isSearching = false)))
        .subscribe(({ results }) => {
          this.movies = results;
        });
    } else {
      this.movies = [];
      this.isSearching = false;
    }
  }

  onClick(value: string) {
    this.search = value;
  }
}
