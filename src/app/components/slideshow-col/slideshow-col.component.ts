import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '@interfaces';

@Component({
  selector: 'app-slideshow-col',
  templateUrl: './slideshow-col.component.html',
  styleUrls: ['./slideshow-col.component.scss'],
})
export class SlideshowColComponent implements OnInit {
  @Input() title = '';
  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();
  slidesOptions = {
    slidesPerView: 3.5,
    freeMode: true,
    spaceBetween: -8,
  };

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

}
