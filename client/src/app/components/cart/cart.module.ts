import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { CartComponent } from './cart.component';
import { CodeViewerModule } from '../code-viewer/code-viewer.module';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CodeViewerModule,
        ClarityModule
    ],
    exports: [CartComponent]
})
export class CartModule {

}
