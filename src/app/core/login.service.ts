import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  AUTH_TOKEN_NAME,
  LocalStorage,
} from './localStorage';
import { IdentityService } from './identity.service';
import { LoginCommand } from './LoginCommand';
import {
  Name,
  User,
} from './user';

import { ExtHttp } from './extHttp.service';

//import { JwtHelper } from 'angular2-jwt';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class LoginService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: ExtHttp, private identityService: IdentityService, private storage: LocalStorage) {
  }

  login(command: LoginCommand): Observable<User> {

    return Observable.create((observer) => {
      const body = {
        username: command.username,
        password: command.password
      };

      this.http.post('/api/user', body).subscribe((response) => {
        debugger;
        const token = response.json();
        observer.next(this.loadUser(token));
      });
    });
  }
// Added comment for Load users
  public loadUser(token: any): User {
    //const userToken = this.jwtHelper.decodeToken(token);
    const userToken = token;
    debugger;
    const name = new Name(userToken.firstname, userToken.lastname);
    const user = new User({name: name, authenticated: true, token: token, id: userToken._id});

    this.storage.setItem(AUTH_TOKEN_NAME, token);
    this.identityService.update(user);
    return user;
  }
}
