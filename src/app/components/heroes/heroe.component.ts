import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

 private heroe:Heroe ={
 	nombre:"",
 	bio:"",
 	casa:"Marvel"
 }

 nuevo:boolean = false;

 id:string;

  constructor(private _heroesServices:HeroesService,
  			  private router:Router,
  			  private _activatedRoute:ActivatedRoute) { 

  		this._activatedRoute.params
  			.subscribe(parametros=>{
  				console.log(parametros);
  				this.id = parametros['id'];

          if (this.id !== "nuevo") {
            
             this._heroesServices.getHeroe(this.id).
             subscribe(data => this.heroe = data)

          }

  			});

  }

  ngOnInit() {
  }

  guardar(){
  	console.log(this.heroe);

  	if (this.id === "nuevo") {
  		// insertando
	  	this._heroesServices.nuevoHeroe(this.heroe)
		  	.subscribe(data=>{

		  		this.router.navigate(['/heroe',data.name])

		  	},
		  	error=>console.log(error));

  	}else{
  		// actualizando
  		 this._heroesServices.actualizarHeroe(this.heroe,this.id)
		  	.subscribe(data=>{

		  		console.log("actualizando heroe")
		  		console.log(data);
		  	},
		  	error=>console.log(error));
  	}


  }

  agregarNuevo(forma:NgForm){
    this.router.navigate(['heroe','nuevo']);

    forma.reset({
      casa:"Marvel"
    });
  }


}
