import 'hammerjs';
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { ChallengeDetailComponent }  from './challenge-detail.component';
import { ChallengeDialogComponent }  from './challenge-dialog.component';
import { ChallengeService }          from './challenge.service';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule }     from './app-routing.module';
import { AceEditorModule } from 'ng2-ace-editor';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AceEditorModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    ChallengeDetailComponent,
    ChallengeDialogComponent
  ],
  entryComponents: [ChallengeDialogComponent],
  providers: [ ChallengeService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
