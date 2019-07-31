import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-header></app-header>
        <app-content></app-content>
        <app-footer></app-footer>
    `,
    styles: [
        `
            :host {
                max-height: 100vh;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: stretch;
            }
        `,
    ],
})
export class AppComponent {}
