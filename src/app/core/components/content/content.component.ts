import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-content',
    template: `
        <app-speaker-table></app-speaker-table>
    `,
    styles: [
        `
            :host {
                flex-grow: 1;
                max-height: calc(100vh - 200px);
                overflow: auto;
                padding: 40px;
                background-color: var(--backcolor2);
            }
        `,
    ],
    host: {
        '[class.background-scroll-shadows]': 'true',
    },
})
export class ContentComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
