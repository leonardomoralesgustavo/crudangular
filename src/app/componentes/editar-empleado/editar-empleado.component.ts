import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import{Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
elID:any;
formularioDeEmpleados:FormGroup;
  constructor(
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador:Router
  ) {
    this.elID=this.activeRoute.snapshot.paramMap.get('id');
    this.crudService.ObtenerEmpleado(this.elID).subscribe(
      respuesta=>{
        this.formularioDeEmpleados.setValue({
          nombre:respuesta[0]['nombre'],
          correo:respuesta[0]['correo']
        });
      }
    );
    this.formularioDeEmpleados=this.formulario.group(
      {
      nombre:[''],
      correo:['']
      }
    );
   }

  ngOnInit(): void {
  }
  
  enviarDatos():any{
    this.crudService.EditarEmpleado(this.elID,this.formularioDeEmpleados.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-empleado');
    });
    
  }

}
