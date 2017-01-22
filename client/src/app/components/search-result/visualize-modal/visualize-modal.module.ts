import { CodeViewerModule } from '../../code-viewer/code-viewer.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { VisualizeModalComponent } from './visualize-modal.component';

@NgModule({
    declarations: [
        VisualizeModalComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CodeViewerModule,
        ClarityModule
    ],
    exports: [VisualizeModalComponent]
})
export class VisualizeModalModule {

}
