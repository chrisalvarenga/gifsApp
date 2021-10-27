import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'JWgaBv6KXOqKB5n1W3qc5hRgn87EikBP';
  private _historial: string[] = [];
  private url: string = 'https://api.giphy.com/v1/gifs'
  resultados: Gif[] = []; 

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
   }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.url}/search`, {params})
    .subscribe((resp: any)=> {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
    
  }

}
