import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavService } from '../../../controller/nav.service';
import { ApiserviceService } from '../../../controller/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {


  adminForm = new FormGroup({
    name: new FormControl(''),
    descripcion: new FormControl(''),
  });
  login: boolean=false;

  constructor(public nav: NavService, public api: ApiserviceService,private toastr: ToastrService) { }

  onSubmit() {
    let createClass = {
      name: this.adminForm.get("name")?.value,
      descripcion: this.adminForm.get("descripcion")?.value

    }

    this.api.postClass(createClass).toPromise().then(res => {
      this.toastr.success('Clase creada', 'Se ha creado la clase correctamente!');

    })
    this.nav.irIndex()
  }
  ngOnInit() {
    this.login=false
    if(localStorage.getItem("idAdmin")!=null || localStorage.getItem("idUser")!=null ){
      this.login=true;
    }
  }
}


