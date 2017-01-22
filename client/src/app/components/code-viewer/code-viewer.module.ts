import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { CodeViewerComponent } from './code-viewer.component';

@NgModule({
    declarations: [
        CodeViewerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ClarityModule
    ],
    exports: [CodeViewerComponent]
})
export class CodeViewerModule {

}
