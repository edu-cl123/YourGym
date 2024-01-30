import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private apiUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  getAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin`);
  }

  getClient(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client`);
  }

  getAdminById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/` + `${id}`);
  }

  getClientById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/` + `${id}`);
  }

  putUpdateClient(body: any): Observable<any> {
    
    return this.http.put<any>(`${this.apiUrl}/client`, body);
  }
  postClient(body: any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/client`, body);
  }

  putUpdateAdmin(body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin`, body);
  }

  getallClases() {
    return this.http.get<any>(`${this.apiUrl}/class`);
  }
  putUpdateClass(body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/class`, body);
  }

  deleteClass(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/class/` + `${id}`)
  }
  postClass(body:any){
    return this.http.post<any>(`${this.apiUrl}/class`,body)

  }

}
