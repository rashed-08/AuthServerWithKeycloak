import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from '../models/foo';

@Injectable({
  providedIn: 'root'
})
export class FooService {

  fooUrl = 'http://localhost:8081/api/v1/foo/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Foo[]> {
    return this.httpClient.get<Foo[]>(this.fooUrl, this.httpOptions);
  }

  public details(id: number): Observable<Foo> {
    return this.httpClient.get<Foo>(this.fooUrl + `details/${id}`, this.httpOptions)
  }

  public create(foo: Foo): Observable<any> {
    return this.httpClient.post<any>(this.fooUrl, foo, this.httpOptions)
  }

  public update(id: number, foo: Foo): Observable<any> {
    return this.httpClient.put<any>(this.fooUrl + `update/${id}`, foo, this.httpOptions)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.fooUrl + `delete/${id}`, this.httpOptions)
  }
}
