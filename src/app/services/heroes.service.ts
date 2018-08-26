import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesUrl:string = "https://crud-74899.firebaseio.com/heroes.json";
  heroeUrl:string = "https://crud-74899.firebaseio.com/heroes/";

  constructor(private http:Http) { }

  nuevoHeroe(heroe:Heroe){

  	let body = JSON.stringify(heroe);
  	let headers = new Headers({
  		'Content-Type': 'application/json'
  	});

	return this.http.post( this.heroesUrl, body, {headers: headers} )
	    .pipe( map( res => {
	      console.log(res.json());
	      return res.json();
	    }));
  }

    actualizarHeroe(heroe:Heroe, key$:string){

  	let body = JSON.stringify(heroe);
  	let headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let url = `${this.heroeUrl}/${key$}.json`;

	return this.http.put( url, body, {headers: headers} )
	    .pipe( map( res => {
	      console.log(res.json());
	      return res.json();
	    }));
  }

// La funcion se usa el filtro de un heroe
  getHeroe(key$:string){
    let url = `${this.heroeUrl}/${key$}.json`
    return this.http.get(url)
            .pipe(map(res=>res.json()));
  }

// Se muestra todos los heroes guardados en el FireBase
  getHeroes(){
    return this.http.get(this.heroesUrl)
            .pipe(map(res=>res.json()))
  }


  EliminarHeroe(key$:string){
    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.delete(url)
            .pipe(map(res=>res.json()))
  }
}
