import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedNewsComponent } from './components/detailed-news/detailed-news.component';
import { ListNewsComponent } from './components/list/list-news/list-news.component';

const routes: Routes = [
  { path: '', redirectTo: '/1', pathMatch: 'full' },
  { path: ':page', component: ListNewsComponent },
  { path: 'details/:id', component: DetailedNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
