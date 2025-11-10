import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '@interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { MoviesService } from '@services';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-populars',
  templateUrl: './populars.page.html',
  styleUrls: ['./populars.page.scss'],
})
export class PopularsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  popularMovies$: Observable<Movie[]>;

  constructor(private _moviesService: MoviesService) {}

  ngOnInit() {
    this.popularMovies$ = this._moviesService.popularMovies$;
  }

  loadData(event) {
    this._moviesService
      .getPopularMovies()
      .pipe(finalize(() => this.infiniteScroll.complete()))
      .subscribe();
  }
}
