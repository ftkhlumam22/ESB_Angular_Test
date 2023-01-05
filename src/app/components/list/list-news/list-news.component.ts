import { ThisReceiver } from '@angular/compiler';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css'],
})
export class ListNewsComponent implements OnInit {
  askStories: any = [];
  error: string = '';
  detailNews: any = [];
  totalItems: number = 0;
  Math = Math;
  page = parseInt(this.route.snapshot.params['page']);
  pageSize = 20;
  isLoading = true;

  constructor(
    private router: Router,
    private hackerNewsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getHackerNews(
      (this.page - 1) * this.pageSize,
      this.pageSize * this.page
    );
  }

  getHackerNews(page: number, pageSize: number) {
    this.hackerNewsService.getNews(page, pageSize).subscribe(
      (askStoriesData) => {
        askStoriesData.forEach((askStory) => {
          this.hackerNewsService.getDetailNews(askStory).subscribe(
            (data) => {
              this.detailNews.push(data);
            },
            (error) => {
              this.error = error;
            }
          );
        });
        this.askStories = this.detailNews;
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  goToDetail(id: number) {
    this.router.navigate(['/details', id]);
  }

  goToPrev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.router.navigate(['/' + this.page]).then(() => {
        window.location.reload();
      });
    }
  }

  goToNext() {
    this.page++;
    this.router.navigate(['/' + this.page]).then(() => {
      window.location.reload();
    });
  }
}
