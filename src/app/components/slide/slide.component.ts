import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie, MovieDetail } from 'src/app/interfaces/movie.interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {
  @Input() movie: Movie | MovieDetail;
  @Input() pathType = 'backdrop_path';

  constructor(private _modalController: ModalController) {}

  ngOnInit() {}

  async onClick() {
    const modal = await this._modalController.create({
      component: DetailComponent,
      componentProps: {
        id: this.movie.id,
      },
    });

    modal.present();
  }
}
