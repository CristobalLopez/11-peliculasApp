import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

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

  buscarPeliculas(texto:string):Observable<Movie[]>{

    const params= {...this.params, page:'1', query: texto};
    // https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${this.baseurl}/search/movie`, {
      params
    }).pipe(map(resp=>resp.results))
  }

  resetCarteleraPage(){
    this.carteleraPage=1;
  }

  getPeliculaDetalle(id:string){
    return this.http.get<MovieResponse>(`${this.baseurl}/movie/${id}`, {params:this.params})
    .pipe(catchError(err=>of(null)))
  }

  getCast(id:string): Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseurl}/movie/${id}/credits`, {params:this.params})
    .pipe(      
      map(resp=>resp.cast),
      catchError(err=>of([])));
}
}
