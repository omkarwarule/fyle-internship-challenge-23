import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private apiUrl = 'https://api.github.com/users/'
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}${githubUsername}`).pipe(
      map(response => {
        // Convert the response to JSON format
        console.log(response);
        return JSON.parse(JSON.stringify(response));
      })
    );
  }
  getPublicRepositories(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}${username}/repos`).pipe(
      map(response=>{
        console.log(response);
        return JSON.parse(JSON.stringify(response));
      })
    );
  }
}
