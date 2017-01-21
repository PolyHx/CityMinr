import { MainModule } from '../main/main.module';
import { CartModule } from '../cart/cart.module';
import { SettingsModule } from '../settings/settings.module';
import { SearchResultModule } from '../search-result/search-result.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MainModule,
        SettingsModule,
        CartModule,
        ClarityModule
    ],
    providers: []
})
export class DashboardModule {
}
