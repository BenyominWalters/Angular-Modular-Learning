import { Challenge } from './challenge';
import { Headers, Http, Response, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import "rxjs";

import { Injectable } from '@angular/core';

@Injectable()
export class ChallengeService {
  private challengeDomain = 'https://bootcamp.microtrain.net';
  //private challengeDomain = 'https://loc.bootcamp.microtrain.net';
  private challengesUrl = this.challengeDomain + '/api/challenges';
  private challengeUrl = this.challengeDomain + '/api/challenges/view/order';
  private latestChallengeUrl = this.challengeDomain + '/api/challenges/view/order';
  private saveChallengeUrl = this.challengeDomain + '/api/challenges/save';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getChallenges(): Promise<Challenge[]> {
    return this.http.get(this.challengesUrl)
    .toPromise()
    .then(response => response.json() as Challenge[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getChallenge(id: number): Promise<Challenge> {

      var url = ``;

      if(id>0){
          url = `${this.challengeUrl}/${id}`;
      }else{
          url = `${this.latestChallengeUrl}`;
      }

      return this.http.get(url)
      .toPromise()
      .then(response => response.json().challenge as Challenge)
      .catch(this.handleError);
  }

  saveChallenge(challenge, challengeId){
      let options = new RequestOptions({ headers: this.headers });
      let body = JSON.stringify({'challenge':challenge,'challenge_id':challengeId});
      return this.http.post(this.saveChallengeUrl, body, options).map((res: Response) => res.json());
  }

}
