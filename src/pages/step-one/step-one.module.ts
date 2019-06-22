import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepOnePage } from './step-one';

@NgModule({
  declarations: [
    StepOnePage,
  ],
  imports: [
    IonicPageModule.forChild(StepOnePage),
  ],
})
export class StepOnePageModule {}
