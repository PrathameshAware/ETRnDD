import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { DownloadsComponent } from './Components/downloads/downloads.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { GeneTableComponent } from './Components/gene-table/gene-table.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'genes',
    component: GeneTableComponent
  },
  {
    path: 'downloads',
    component: DownloadsComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
