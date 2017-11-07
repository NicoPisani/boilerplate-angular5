import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable()
export class RequestsService {

  constructor(
    private http: Http
  ) { }


  public checkForTakenEmail(email: string): {[key: string]: any} {
    return new Promise ((res, rej) => {
      this.http.post(`${ environment.url }validate-email`, {email: email})
      .map(response => response.json())
      .subscribe(body => {
        console.log(body);
        if ( body.error ) {
          res({'duplicate': true});
        } else {
          res(null);
        }
      });
    });
  }

}
