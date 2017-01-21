import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { CartComponent } from './cart.component';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,

        ClarityModule
    ],
    exports: [CartComponent]
})
export class CartModule {

}
