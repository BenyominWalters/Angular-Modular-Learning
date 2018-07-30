import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChallengeDetailComponent }  from './challenge-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/challenge/1', pathMatch: 'full' },
  { path: 'challenge/:id', component: ChallengeDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
