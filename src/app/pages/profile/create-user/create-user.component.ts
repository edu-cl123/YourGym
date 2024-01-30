import { Component } from '@angular/core';
import { ApiserviceService } from '../../../controller/apiservice.service';
import { NavService } from '../../../controller/nav.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  admininfo: any
  login = false
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Validación para un correo electrónico
    name: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]), // Validación para un número de teléfono de 9 dígitos
    surname: new FormControl(''),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]), // Validación para un DNI de 8 dígitos seguido por 1 letra
    password: new FormControl(''),
  });

  constructor(public nav: NavService, public api: ApiserviceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.login = false
    if (localStorage.getItem("idAdmin") != null || localStorage.getItem("idUser") != null) {
      this.login = true;
    }
    let idAdmin = localStorage.getItem("idAdmin")
    this.api.getAdminById(idAdmin).toPromise().then((res: any) => {
      this.admininfo = res

    })

  }
  onSubmitClient() {
    let clientUpdate = {
      email: this.profileForm.get("email")?.value,
      name: this.profileForm.get("name")?.value,
      phone: this.profileForm.get("phone")?.value,
      surname: this.profileForm.get("surname")?.value,
      dni: this.profileForm.get("dni")?.value,
      password: this.profileForm.get("password")?.value,
      idadmin: this.admininfo
    }

    this.api.postClient(clientUpdate).toPromise().then(res => {
      this.toastr.success('Cliente creado', 'Se ha registrado al usuario correctamente!');

    })
    this.nav.irIndex()
  }

}
