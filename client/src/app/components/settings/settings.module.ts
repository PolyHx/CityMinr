import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { SettingsComponent } from './settings.component';
import { ControlModule } from './control/control.module';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ControlModule,

        ClarityModule
    ],
    exports: [SettingsComponent]
})
export class SettingsModule {

}
