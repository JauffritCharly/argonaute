import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Membre} from "../models/membre";

@Injectable({
  providedIn: 'root'
})
export class ApiArgonauteService {
  private Base_URL: string = "http://127.0.0.1:8000/apip/equipages?page=1&pagination=true";

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  public getEquipage(): Observable<Membre[]> {
    return this.http.get(this.Base_URL)
      .pipe(
        map((e: any) => e['hydra:member'])
      );
  }

  public postEquipage(form: any): any {
    return this.http.post(this.Base_URL, form)
  }
}


