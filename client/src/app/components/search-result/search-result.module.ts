import { VisualizeModalModule } from './visualize-modal/visualize-modal.module';
import { ResourceModule } from '../resource/resource.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { SearchResultComponent } from './search-result.component';

@NgModule({
    declarations: [
        SearchResultComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ClarityModule,
        ResourceModule,
        VisualizeModalModule
    ],
    exports: [
        SearchResultComponent
    ]
})
export class SearchResultModule {
}
