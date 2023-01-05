import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ListNewsComponent } from './components/list/list-news/list-news.component';
import { DetailedNewsComponent } from './components/detailed-news/detailed-news.component';

@NgModule({
  declarations: [AppComponent, ListNewsComponent, DetailedNewsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
