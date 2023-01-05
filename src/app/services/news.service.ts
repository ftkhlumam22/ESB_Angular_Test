import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, pipe, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public oldPages: number = 0;
  public initPages: number = 1;
  constructor(private http: HttpClient) {}

  private newsCache: any = false;

  private baseUrl = 'https://hacker-news.firebaseio.com/v0';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getNews(page: number, pageSize: number): Observable<any[]> {
    if (this.newsCache && page == this.oldPages) {
      return of(this.newsCache);
    } else {
      this.newsCache = false;
      return this.http.get<number[]>(`${this.baseUrl}/askstories.json`).pipe(
        map((askStories) => askStories.slice(page, pageSize)),
        tap(
          (askStories) => (
            (this.newsCache = askStories), (this.oldPages = page)
          )
        ),
        catchError(this.handleError<any[]>('getNews', []))
      );
    }
  }

  getDetailNews(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/item/${id}.json`);
  }
}
