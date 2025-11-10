import { Pipe, PipeTransform } from '@angular/core';
import { MovieDetail } from '../interfaces/movie.interfaces';

@Pipe({
  name: 'genres',
})
export class GenresPipe implements PipeTransform {
  transform(items: MovieDetail[], ...args: any[]): MovieDetail[] {
    if (!args[0]) {
      return items;
    }

    if (!items) {
      return;
    }

    return items.filter((item) =>
      item.genres.some((genre) =>
        genre.id === args[0]
      )
    );
  }
}
