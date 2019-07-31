import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { HeroTableComponent } from './components/hero-table/hero-table.component';
import { HeroBadgeComponent } from './components/hero-badge/hero-badge.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        HeroTableComponent,
        HeroBadgeComponent,
    ],
    imports: [CommonModule, FormsModule, HttpClientModule],
    exports: [HeaderComponent, FooterComponent, ContentComponent, HeroBadgeComponent],
})
export class CoreModule {}
