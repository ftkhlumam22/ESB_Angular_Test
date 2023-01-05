import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-detailed-news',
  templateUrl: './detailed-news.component.html',
  styleUrls: ['./detailed-news.component.css'],
})
export class DetailedNewsComponent implements OnInit {
  id: number = 0;
  detailed: any = {};
  commentsList: any = [];
  comments: any = [];
  error: string = '';
  showComments = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private hackerNewsService: NewsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.hackerNewsService.getDetailNews(this.id).subscribe(
      (data) => {
        this.detailed = data;
        this.commentsList = data.kids;
        this.commentsList.map((data: number) => {
          data = data;
          this.hackerNewsService
            .getDetailNews(data)
            .subscribe((fetched) => this.comments.push(fetched));
        });
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
