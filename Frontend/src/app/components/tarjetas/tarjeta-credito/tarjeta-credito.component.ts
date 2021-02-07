import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  formTarjeta: FormGroup;
  tarjeta: TarjetaCredito;
  idTarjeta=0;

  constructor(private formBuilder: FormBuilder, private serviceTarjeta: TarjetaService, private toastr: ToastrService) {

    this.formValidaciones();
  }

  ngOnInit(): void {
    this.serviceTarjeta.obtenerTarjeta().subscribe(data=>{
      this.tarjeta = data;
      this.formTarjeta.patchValue({
        titular: this.tarjeta.titular,
        nroTarjeta: this.tarjeta.nroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  formValidaciones(){
    this.formTarjeta = this.formBuilder.group({
      id: 0,
      titular: ['',[Validators.required]],
      nroTarjeta:['',[Validators.required,Validators.maxLength(16),Validators.minLength(10)]],
      fechaExpiracion: ['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    });
  }

  guardarTarjeta(){
    if(this.idTarjeta === 0){
      this.agregar();
    }else{
      this.editar();
    }

  }


  agregar(){
    const tarjeta: TarjetaCredito = this.formTarjeta.value;
    this.serviceTarjeta.addTarjeta(tarjeta).subscribe(data => {
      this.toastr.success("Registro Agregado", "La Tarjeta fue agregada");
      this.serviceTarjeta.getTarjeta();
      this.formTarjeta.reset();
    });
  }

  editar(){
    const tarjeta: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.formTarjeta.get('titular').value,
      nroTarjeta: this.formTarjeta.get('nroTarjeta').value,
      fechaExpiracion: this.formTarjeta.get('fechaExpiracion').value,
      cvv: this.formTarjeta.get('cvv').value,
    };

    this.serviceTarjeta.updateTarjetaCredito(this.tarjeta.id, tarjeta).subscribe(data=>{
      this.toastr.info("Registro Actualizado", "La Tarjeta fue actualizada");
      this.serviceTarjeta.getTarjeta();
      this.formTarjeta.reset();
      this.idTarjeta = 0;
    })
  }
}
