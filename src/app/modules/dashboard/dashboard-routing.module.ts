import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PodcastComponent } from './pages/member/member.component';
import { CompetitionComponent } from './pages/competition/competition.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'competition', pathMatch: 'full' },
      { path: 'competition', component: CompetitionComponent },
      { path: 'member', component: PodcastComponent },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
