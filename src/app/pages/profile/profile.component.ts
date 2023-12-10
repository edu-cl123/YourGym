import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../controller/apiservice.service';
import { CommonModule } from '@angular/common';  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isAdmin: boolean = false
  
  userInfo:any
  admininfo:any

  profileForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl(''),
    surname: new FormControl(''),
    dni: new FormControl(''),
    password: new FormControl(''),
  });
  
  adminForm = new FormGroup({
    email: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
  });



  constructor(public nav: NavService, public api: ApiserviceService,private toastr: ToastrService) { }

  ngOnInit() {
    
    if(localStorage.getItem("idAdmin")!=null){
      let idAdmin=localStorage.getItem("idAdmin")
      this.api.getAdminById(idAdmin).toPromise().then((res:any)=>{
        this.admininfo=res
        this.adminForm.setValue({
          email: res.email, 
          user: res.user,
          password: res.password,
        });       
      })
      this.isAdmin=true

    }else{
      let idClient=localStorage.getItem("idUser")
      this.api.getClientById(idClient).toPromise().then(res=>{
        this.userInfo=res
        this.profileForm.setValue({
          email: res.email, 
          name: res.name,
          phone: res.phone,
          surname: res.surname, 
          dni: res.dni,
          password: res.password

        });       
      })
    }
  }

  onSubmit(){
    let clientUpdate={
      id:this.admininfo.id,
      email: this.adminForm.get("email")?.value, 
      user:this.adminForm.get("user")?.value,
      password: this.adminForm.get("password")?.value
    }

    this.api.putUpdateAdmin(clientUpdate).toPromise().then(res=>{
      //Toast para avisar de actualizacion
      this.toastr.success('Admin actualizado', 'Se ha actualizado al usuario correctamente!');
    })
    this.nav.irIndex()
  }
   onSubmitClient(){
    let clientUpdate={
      id:this.userInfo.id,
      clase:this.userInfo.clase,
      email: this.profileForm.get("email")?.value, 
      name:this.profileForm.get("name")?.value,
      phone: this.profileForm.get("phone")?.value,
      surname:this.profileForm.get("surname")?.value, 
      dni: this.profileForm.get("dni")?.value,
      password: this.profileForm.get("password")?.value
    }

    this.api.putUpdateClient(clientUpdate).toPromise().then(res=>{
      //Toast para avisar de actualizacion
      this.toastr.success('CLiente actualizado', 'Se ha actualizado al cliente correctamente!');
    })
    this.nav.irIndex()
  }
}
