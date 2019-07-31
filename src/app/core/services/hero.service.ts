import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// The URL to the Marvel API
const HERO_API = `${environment.MARVEL_API.URL}/v1/public/characters`;

// Our Limits for Search
const LIMIT_LOW = 10;
const LIMIT_MID = 25;
const LIMIT_HIGH = 100;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    limits = LIMITS;

    /**
     * PRIVATIZE THE SUBJECTS
     * We don't want people outsize of this service to put new data into the BehaviorSubjects.
     * Doing this forces anyone who wants to modify the data in our API to use the functions
     * on our service instead of manually calling .next on them. Forcing people to use this
     * API this way is a proper facade technique.
     */
    private searchBS = new BehaviorSubject('');
    private limitBS = new BehaviorSubject(LIMIT_LOW);
    private pageBS = new BehaviorSubject(0);
    private totalBS = new BehaviorSubject(0);

    /**
     * PUBLIC OBSERVABLE APIS
     * This is where we expose the BehaviorSubjects externally, but as observables. These
     * observables don't have a .next function that can be used to modify the data. They
     * are only useful to consume data. Not to write back to the service.
     */
    search$ = this.searchBS.asObservable();
    limit$ = this.limitBS.asObservable();
    page$ = this.pageBS.asObservable();
    total$ = this.totalBS.asObservable();

    totalPages$ = combineLatest(this.total$, this.limit$).pipe(
        map(([total, limit]) => Math.ceil(total / limit)),
    );

    combined = combineLatest(this.search$, this.page$, this.limit$);

    heroes$ = this.combined.pipe(
        switchMap(([search, page, limit]) => {
            const params: any = {
                apikey: environment.MARVEL_API.PUBLIC_KEY,
                limit: `${limit}`,
                offset: `${page * limit}`, // page * limit
            };

            if (search) {
                params.nameStartsWith = search;
            }

            return this.http.get(HERO_API, {
                params,
            });
        }),
        tap((res: any) => this.totalBS.next(res.data.total)),
        map((res: any) => res.data.results),
    );

    constructor(private http: HttpClient) {}

    setSearch(term) {
        this.searchBS.next(term);
        this.pageBS.next(0);
    }

    setLimit(limit) {
        this.limitBS.next(limit);
        this.pageBS.next(0);
    }

    setPageBy(num) {
        const currentPage = this.pageBS.getValue();
        this.pageBS.next(currentPage + num);
    }
}
