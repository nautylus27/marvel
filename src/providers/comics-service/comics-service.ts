import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ComicsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComicsServiceProvider {

  constructor(
    private http: HttpClient
    ) {}

  getComics(){
    return this.http.get('https://gateway.marvel.com/v1/public/comics?ts=1&apikey=b5dd158dd0e856443db7fb726fbc6bc9&hash=80182fcb24c6426319114b9e34eafed6');
  }

}
