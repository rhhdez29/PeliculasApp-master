import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularsPageRoutingModule } from './populars-routing.module';

import { PopularsPage } from './populars.page';
import { ComponentsModule } from '@components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PopularsPage]
})
export class PopularsPageModule {}
