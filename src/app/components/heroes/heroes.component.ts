import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any[] = [];
  loading:boolean = true;


  constructor(private _heroesService:HeroesService) {

  		this._heroesService.getHeroes()
  			.subscribe(data=>{

  				console.log("Lista Heroes");
  				console.log(data);

          // this.loading = false

          setTimeout(()=>{
                          this.loading = false;
                          this.heroes = data;
                          }, 3000)

  				//Este codigo usa de mostrar los datos en un arreglo	
  				// for(let key$ in data){
  				// 	let h = data[key$];
  				// 	h.key$ = key$;
  				// 	this.heroes.push(data[key$]);
  				// }

  				//  console.log(this.heroes);
  			})

   }

  ngOnInit() {
  }

  borrarHeroe(key$:string){
      this._heroesService.EliminarHeroe(key$)
          .subscribe(respuesta =>{
            if (respuesta) {
              // Error 
              console.error(respuesta);
            }else{
              // Todo bien
              delete this.heroes[key$];
            }
          })
  }

}
