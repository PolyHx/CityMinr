import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { PredictionComponent } from './prediction.component';

@NgModule({
    declarations: [
        PredictionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ClarityModule
    ],
    exports: [
        PredictionComponent
    ],
    providers: []
})
export class PredictionModule {
}
