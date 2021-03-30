import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserS } from '@atme/entity/User';
import { BASE_URI, USER_API } from '@atme/serverAPI';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  constructor(
    private readonly http:HttpClient
  ) { }

  signUp(user: UserS): Observable<unknown> {

    return this.http.post<UserS>(`${BASE_URI}${USER_API}/`, user).pipe(
      catchError((err) => throwError(err))
    );

  }

}
