import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { ResourceComponent } from './resource.component';

@NgModule({
    declarations: [
        ResourceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ClarityModule
    ],
    exports: [
        ResourceComponent
    ],
    providers: []
})
export class ResourceModule {
}
