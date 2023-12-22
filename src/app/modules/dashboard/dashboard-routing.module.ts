import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MemberComponent } from './pages/member/member.component';
import { CompetitionComponent } from './pages/competition/competition.component';
import { MemberCompetitionComponent } from './pages/member-competition/member-competition.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { HuntingComponent } from './pages/hunting/hunting.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'competition', pathMatch: 'full' },
      { path: 'competition', component: CompetitionComponent },
      { path: 'member', component: MemberComponent },
      { path: 'add-member-to-competition/:code', component: MemberCompetitionComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'hunting', component: HuntingComponent },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
