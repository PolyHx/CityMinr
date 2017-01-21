import { SearchResultModule } from '../search-result/search-result.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { MainComponent } from './main.component';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        SearchResultModule
    ],
    providers: []
})
export class MainModule {
}
