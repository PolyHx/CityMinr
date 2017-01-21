import { LabelService } from './services/label.service';
import { MainModule } from './components/main/main.module';
import { SettingsModule } from './components/settings/settings.module';
import { CartModule } from './components/cart/cart.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routes";
import { DataSourceService } from './services/datasource.service';
import { SearchService } from './services/search.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        //Vendor modules
        ClarityModule.forRoot(),
        ROUTING,

        //Custom modules
        MainModule,
        SettingsModule,
        CartModule

    ],
    providers: [DataSourceService, SearchService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
