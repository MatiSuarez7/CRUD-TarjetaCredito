import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService, public toastr: ToastrService) {


  }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  obtenerTarjeta(){
    this.tarjetaService.getTarjeta();
  }

  eliminarTarjeta(id: number){
    if (confirm('Está seguro que desea eliminar el registro?')) {
        this.tarjetaService.deteleTarjeta(id).subscribe(data=>{
          this.toastr.warning('Registro Eliminado','La tarjeta fue eliminada');
          this.tarjetaService.getTarjeta();
        });
    }
  }

  editarTarjeta(tarjeta){
    this.tarjetaService.updateTarjeta(tarjeta);
  }

}
