import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(name: string, size = 'w500'): string {
    if (!name) {
      return 'assets/no-image-banner.jpg';
    }
    return `${environment.IMG_ROOT_URL}/${size}${name}`;
  }
}
