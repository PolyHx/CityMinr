import { LabelService } from './services/label.service';
import { MainModule } from './components/main/main.module';
import { SettingsModule } from './components/settings/settings.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routes";
import { DataSourcesServices } from './services/datasources.service';

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
        SettingsModule
    ],
    providers: [
        DataSourcesServices,
        LabelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
