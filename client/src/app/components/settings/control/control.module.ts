import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { ControlComponent } from './control.component';

@NgModule({
    declarations: [
        ControlComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,

        ClarityModule
    ],
    exports: [ControlComponent]
})
export class ControlModule {

}
