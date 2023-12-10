import { Component } from '@angular/core';
import { ApiserviceService } from '../../../controller/apiservice.service';
import { NavService } from '../../../controller/nav.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  admininfo:any
  profileForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl(''),
    surname: new FormControl(''),
    dni: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public nav: NavService, public api: ApiserviceService,private toastr: ToastrService) { }

  ngOnInit(){
    let idAdmin=localStorage.getItem("idAdmin")
    this.api.getAdminById(idAdmin).toPromise().then((res:any)=>{
      this.admininfo=res
  
    })
  }
  onSubmitClient(){
    let clientUpdate={
      email: this.profileForm.get("email")?.value, 
      name:this.profileForm.get("name")?.value,
      phone: this.profileForm.get("phone")?.value,
      surname:this.profileForm.get("surname")?.value, 
      dni: this.profileForm.get("dni")?.value,
      password: this.profileForm.get("password")?.value,
      idadmin:this.admininfo
    }

    this.api.postClient(clientUpdate).toPromise().then(res=>{
      this.toastr.success('Cliente creado', 'Se ha registrado al usuario correctamente!');

    })
    this.nav.irIndex()
  }
  
}
