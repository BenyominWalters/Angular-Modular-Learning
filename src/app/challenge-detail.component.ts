import 'rxjs/add/operator/switchMap';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Challenge } from './challenge';
import { ChallengeService } from './challenge.service';
import { ChallengeDialogComponent } from './challenge-dialog.component';
import { MdDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './challenge-detail.component.html'
})
export class ChallengeDetailComponent implements OnInit {
  public challenge: Challenge;
  public challengeId: number;
  public currentChallengeId: number;
  public nextChallengeId: number;
  public lastChallengeId: number;
  public text: string = "";
  public options: any = { maxLines: 1000, fontSize: 18, printMargin: 80 };
  public challengeErrors: number;
  public challengeComplete: boolean;
  public challengeDialog: boolean;
  public iframeState: string;

  @ViewChild('editor') editor;
  @ViewChild('iframe') iframe;
  @ViewChild('mocha') mocha;
  @ViewChild('overlay') overlay;

  constructor(
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dialog: MdDialog
  ) {
    this.challengeErrors = 0;
    this.challengeComplete = false;
    this.challengeDialog = false;
  }

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe(challenge => {

        if (challenge['route'] != undefined) {
          this.router.navigateByUrl('challenge/' + challenge['route']);
        } else {
          this.challenge = challenge
        }

      });


  }

  ngAfterViewInit(): void { }

  ngAfterViewChecked(): void { }

  ngAfterContentChecked(): void {

    let step = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.challengeId = +step;
    this.nextChallengeId = +step + 1;
    this.lastChallengeId = +step - 1;


    //Has challenge had a chance to populate?
    if (this.challenge) {
      //Is text in a state that requires change?
      if (this.text === "" || this.currentChallengeId != this.challengeId) {
        //Has the challenge state caught up to the route?
        if (this.challengeId === +this.challenge.order) {
          this.text = this.challenge.primer;
          this.currentChallengeId = this.challengeId;
          this.challengeComplete = false;
          this.challengeDialog = false;
        }
      }
    }

    this.setPreview();

    if (this.challengeComplete === false) {
      this.runTests();
    }

    if (this.challengeComplete === true && this.challengeDialog === false) {
      this.challengeDialog = true;
      var thisn = this;
      this.challengeService.saveChallenge(this.text, this.challengeId).
        subscribe(
        data => console.log(data),
        error => console.log(error)
        );
      setTimeout(function() { thisn.openDialog(); }, 100)
    }

  }

  setPreview(): void {

    if (this.iframe) {
      let content = this.text;

      //Only update the iframe if something has changed
      if(this.iframeState != content){
        this.iframeState = this.text;
        let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
        doc.open();
        doc.write(content);
        doc.close();
      }

    }

  }

  resetEditor(): void {
    this.text = '';
    this.setPreview();
  }

  //Performs a simple string match againt the user input.
  testStringInclude(input, match): string {
    let temp = input;
    return temp.replace(/\s/g, '').includes(match) ? 'passed' : 'failed';
  }

  testChallenge7(match) {

    if (this.iframe) {
      let errors = false;
      let content = this.text;
      let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      let ul = doc.querySelector('ul');
      let li = ul.querySelector('li');
      let a = li.querySelector('a');

      if (match == 1) {
        if (a !== null) {
          return 'passed';
        }
      }

      if (match == 2) {
        if (a !== null) {
          if (a.href == 'https://www.w3schools.com/html/html5_intro.asp') {
            return 'passed';
          }
        }
      }

      if (match == 3) {
        if (a !== null) {
          if (a.target == '_blank') {
            return 'passed';
          }
        }
      }

      if (match == 4) {
        if (a !== null) {
          let temp = a.innerHTML;
          if (temp.replace(/\s/g, '').includes('W3Schools')) {
            return 'passed';
          }
        }
      }
    }

    return 'failed';
  }

  testChallenge8(match) {

    if (this.iframe) {
      let errors = false;
      let content = this.text;
      let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      let h1 = doc.querySelector('h1');
      let p = doc.querySelector('p');

      if (match == 1) {
        if (h1.style !== null) {
          if (h1.style.color === 'red') {
            return 'passed';
          }
        }
      }

      if (match == 2) {
        if (p.style !== null) {
          if (p.style.color === 'blue') {
            return 'passed';
          }
        }
      }
    }
    return 'failed';
  }

  testChallenge9(match) {

    if (this.iframe) {
      let errors = false;
      let content = this.text;
      let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      let h1 = doc.querySelector('h1');
      let p = doc.querySelector('p');



      if (match == 1) {
        if (h1.style !== null) {
          let test = getComputedStyle(h1).getPropertyValue('color');
          if (test.replace(/\s/g, '') == "rgb(255,0,0)") {
            return 'passed';
          }
        }
      }

      if (match == 2) {
        let test = getComputedStyle(p).getPropertyValue('color');

        if (p.style !== null) {
          if (test.replace(/\s/g, '') == "rgb(0,128,0)") {
            return 'passed';
          }
        }
      }
    }
    return 'failed';
  }

  testChallenge11(match) {
    if (this.iframe) {
      let errors = false;
      let content = this.text;
      let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      let ul = doc.querySelector('ul');
      if (match == 1) {
        if (ul.id !== null) {
          if (ul.id == "AdditionalResources") {
            return 'passed';
          }
        }
      }
    }
    return 'failed';
  }

  testChallenge12(match) {

    if (this.iframe) {
      let errors = false;
      let content = this.text;
      let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      let ul = doc.querySelector('ul');
      let button = doc.querySelector('button');

      if (match == 2) {
        if (ul.style !== null) {
          let test = getComputedStyle(ul).getPropertyValue('color');
          if (test.replace(/\s/g, '') == "rgb(128,0,128)") {
            return 'passed';
          }
        }
      }
    }
    return 'failed';
  }


  runTests(): void {
    if (this.mocha) {

      var specList: Array<any> = JSON.parse(this.challenge.specs);

      let userInput = this.text;
      let id = this.challengeId;

      //Run tests against the user input
      for (let i = 0; i < specList.length; i++) {
        if (specList[i].type == 'testStringInclude') {
          specList[i].status = this.testStringInclude(userInput, specList[i].match);
        }

        if (specList[i].type == 'testChallenge7') {
          specList[i].status = this.testChallenge7(specList[i].match);
        }

        if (specList[i].type == 'testChallenge8') {
          specList[i].status = this.testChallenge8(specList[i].match);
        }

        if (specList[i].type == 'testChallenge9') {
          specList[i].status = this.testChallenge9(specList[i].match);
        }

        if (specList[i].type == 'testChallenge11') {
          specList[i].status = this.testChallenge11(specList[i].match);
        }

        if (specList[i].type == 'testChallenge12') {
          specList[i].status = this.testChallenge12(specList[i].match);
        }
      }

      let specs = specList;

      let result = '';

      this.challengeErrors = 0;
      for (let spec of specs) {
        result = result + '<div class="test-' + spec.status + '">' + spec.label + '</div>';

        if (spec.status == 'failed') {
          this.challengeErrors = this.challengeErrors + 1;
        }
      }

      this.mocha.nativeElement.innerHTML = result;

      if (this.challengeErrors == 0) {
        this.challengeComplete = true;
      }

    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ChallengeDialogComponent, { disableClose: true });
    dialogRef.componentInstance.title = this.challenge.name;
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('challenge/' + this.nextChallengeId);
    });
  }

}
