import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
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
    email: new FormControl('', [Validators.required, Validators.email]), // Validación para un correo electrónico
    name: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]), // Validación para un número de teléfono de 9 dígitos
    surname: new FormControl(''),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]), // Validación para un DNI de 8 dígitos seguido por 1 letra
    password: new FormControl(''),
  });
  
  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Validación para un correo electrónico
    user: new FormControl(''),
    password: new FormControl(''),
  });
  login: boolean=false;



  constructor(public nav: NavService, public api: ApiserviceService,private toastr: ToastrService) { }

  ngOnInit() {

    this.login=false
    if(localStorage.getItem("idAdmin")!=null || localStorage.getItem("idUser")!=null ){
      this.login=true;
    }
    
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
      this.toastr.success('Cliente actualizado', 'Se ha actualizado al cliente correctamente!');
    })
    this.nav.irIndex()
  }
}
