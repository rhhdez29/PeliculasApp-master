import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { Genre } from '../interfaces/genre.interfaces';
import { MoviesService } from '../services/movies.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  genres: Genre[] = [];

  selectedGenre: Genre = null;

  constructor(
    private _storageService: StorageService,
    private _moviesService: MoviesService,
    private _pickerController: PickerController
  ) {}

  ngOnInit() {
    this._moviesService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  get movies() {
    return this._storageService.movies;
  }

  async presentPicker() {
    const picker = await this._pickerController.create({
      buttons: [
        {
          text: 'Confirmar',
          handler: (selected) => {
            this.selectedGenre = selected.genres.value;
          },
        },
      ],
      columns: [
        {
          name: 'genres',
          options: this.genres.map((genre) => ({
            text: genre.name,
            value: genre,
          })),
        },
      ],
    });
    await picker.present();
  }
}
