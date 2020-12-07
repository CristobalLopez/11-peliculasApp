import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseurl: string= 'https://api.themoviedb.org/3';
  private carteleraPage =1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return {
      api_key: 'e13ab7619e3d21d390a819b260589083',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]>{

    if (this.cargando) {
      return of ([]);
    }
    this.cargando= true;
    return this.http.get<CarteleraResponse>(`${this.baseurl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp)=> resp.results),
      tap(()=>{
        this.carteleraPage+=1;
        this.cargando=false;
      })
    );
  }
}
