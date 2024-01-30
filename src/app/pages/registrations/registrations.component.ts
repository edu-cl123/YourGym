import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';
import { ApiserviceService } from '../../controller/apiservice.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css'
})
export class RegistrationsComponent {
  clases: any = []
  isAdmin: boolean = false
  login = false
  error: boolean = false
  userInfo: any
  constructor(public nav: NavService, public api: ApiserviceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData()
    this.login = false
    if (localStorage.getItem("idAdmin") != null || localStorage.getItem("idUser") != null) {
      this.login = true;
    }
  }

  loadData() {

    this.api.getallClases().toPromise().then(res => {
      this.clases = res
    }, error => {
      error = true
    })

    if (localStorage.getItem("idAdmin") != null) {
      let idAdmin = localStorage.getItem("idAdmin")
      this.isAdmin = true
    } else if (localStorage.getItem("idUser") != null) {
      let ACtualizarArray = []
      let idClient = localStorage.getItem("idUser")
      this.api.getClientById(idClient).toPromise().then(res => {
        this.userInfo = res
      })

    }
  }

  apuntarse(clase: any) {
    let clasesusuarios: Array<any> = clase.client
    let userFound = false

    for (let i = 0; i < clasesusuarios.length; i++) {

      if (clasesusuarios[i].email == this.userInfo.email) {
        userFound = true
      }
    }

    if (!userFound) {

      clasesusuarios.push(this.userInfo)
      clase.client = clasesusuarios

      this.api.putUpdateClass(clase).toPromise().then(res => {

        this.toastr.success('Usuario añadido', 'Se ha añadido el usuario a la  clase correctamente!');

      })
    } else {
      //Toast para controlarlo
      this.toastr.warning('Error', 'Ya estas inscrito en esta clase! ');
    }

  }

  eliminarclass(idClass: any) {


    this.api.deleteClass(idClass).toPromise().then(res => {
      this.toastr.success('Clase eliminada', 'Se ha eliminado la clase correctamente!');

    })
  }



  createForm() {
    this.nav.irCreateClass()
  }
}
