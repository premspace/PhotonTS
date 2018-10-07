import { Injectable } from '@angular/core';
import { ResponseHandler } from './responseHandler.service';
import { IdentityService } from './identity.service';
import {
  Headers,
  Http,
  Request,
  RequestMethod,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import { ExtHttpConfig } from './ExtHttpConfig';

@Injectable()
export class ExtHttp {
  private HEADER_PREFIX = 'Bearer';
  private urlRoot: string;
  process: Subject<any> = new Subject<any>();
  constructor(private _http: Http,
              private serverHandler: ResponseHandler,
              private identityService: IdentityService,
              private config: ExtHttpConfig) {
    this.urlRoot = config.url;
  }

  private _generateToken(): string {
    return `${this.HEADER_PREFIX} ${this.identityService.user.token}`;
  }

  private _createAuthHeaders(): Headers {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    if (this.identityService.user) {
      headers.set('Authorization', this._generateToken());
    }

    return headers;
  }

  public get(url: string, options?: RequestOptionsArgs) {
    return this._request(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs) {
    return this._request(RequestMethod.Post, url, JSON.stringify(body), options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs) {
    return this._request(RequestMethod.Put, url, JSON.stringify(body), options);
  }

  public delete(url: string, options?: RequestOptionsArgs) {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  private _request(method: RequestMethod, relativeUrl: string, body?: string, options?: RequestOptionsArgs): Observable<any> {
    const url = this.urlRoot + relativeUrl;
    const requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: url,
      body: body,
      headers: this._createAuthHeaders()
    }, options));
    return Observable.create((observer) => {
      this._http.request(new Request(requestOptions))
        .subscribe(
          (res) => {
            observer.next(res);
            observer.complete();
          },
          (err) => {
            switch (err.status) {
              case 401:
                this.serverHandler.handle401();
                observer.complete();
                break;
              case 403:
                this.serverHandler.handle403();
                observer.complete();
                break;
              case 500:
                this.serverHandler.handle500();
                observer.complete();
                break;
              default:
                observer.error(err);
                break;
            }
          });
    });
  }
}
