import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CoreModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
