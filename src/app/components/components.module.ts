import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@pipes';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideComponent } from './slide/slide.component';
import { HeaderComponent } from './header/header.component';
import { SlideshowColComponent } from './slideshow-col/slideshow-col.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideComponent,
    HeaderComponent,
    SlideshowColComponent,
    DetailComponent,
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowColComponent,
    SlideComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, IonicModule, PipesModule],
})
export class ComponentsModule {}
