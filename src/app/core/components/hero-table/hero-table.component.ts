import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'app-speaker-table',
    template: `
        <div class="tool-bar">
            <span class="search-tool">
                <label for="herosearch">Search: </label>
                <input
                    name="herosearch"
                    [ngModel]="search$ | async"
                    (ngModelChange)="doSearch($event)"
                />
            </span>
            <span class="page-tool">
                <label>Page {{ userPage$ | async }} of {{ totalPages$ | async }} : </label>
                <span class="buttons">
                    <button class="prev" (click)="setPageBy(-1)" [disabled]="isFirstPage$ | async">
                        Prev
                    </button>
                    <button class="next" (click)="setPageBy(1)" [disabled]="isLastPage$ | async">
                        Next
                    </button>
                </span>
            </span>
            <span class="result-tool">
                <label>Show Results: </label>
                <span class="buttons">
                    <button
                        *ngFor="let limit of limits"
                        [disabled]="limit === (limit$ | async)"
                        (click)="doLimit(limit)"
                    >
                        {{ limit }}
                    </button>
                </span>
            </span>
            <span class="total-tool">
                <label>Total Results: {{ total$ | async }}</label>
            </span>
        </div>
        <div class="table-content" *ngIf="heroes$ | async as heroes">
            <app-hero-badge *ngFor="let hero of heroes" [hero]="hero"></app-hero-badge>
        </div>
    `,
    styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent {
    heroes$ = this.heroService.heroes$;
    search$ = this.heroService.search$;
    page$ = this.heroService.page$;
    userPage$ = this.page$.pipe(map(page => page + 1));
    limit$ = this.heroService.limit$;
    total$ = this.heroService.total$;
    totalPages$ = this.heroService.totalPages$;

    isFirstPage$ = this.page$.pipe(map(page => page === 0));
    isLastPage$ = combineLatest(this.page$, this.totalPages$).pipe(
        map(([page, totalPages]) => page === totalPages - 1),
    );

    limits = this.heroService.limits;

    constructor(private heroService: HeroService) {}

    doSearch(term) {
        this.heroService.setSearch(term);
    }

    doLimit(limit) {
        this.heroService.setLimit(limit);
    }

    setPageBy(num) {
        this.heroService.setPageBy(num);
    }
}
