import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';
import { ApiserviceService } from '../../controller/apiservice.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  admin:any = []
  user:any = []
  
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  login: boolean=false;

  constructor(public nav: NavService, public api: ApiserviceService) { }

  async allAdmin() {
    await this.api.getAdmin().toPromise().then((res: any) => {
      this.admin = res
    })
  }

  async allUser() {
    await this.api.getClient().toPromise().then((res: any) => {
      this.user = res
    })
  }

  ngOnInit() {
    this.allAdmin()
    this.allUser()
    localStorage.clear()
    this.login=false
    if(localStorage.getItem("idAdmin")!=null || localStorage.getItem("idUser")!=null ){
      this.login=true;
    }
  }

  onSubmit() {
   
    for(let i=0;i<this.admin.length;i++){
      if(this.admin[i].email==this.profileForm.get("email")?.value && this.admin[i].password==this.profileForm.get("password")?.value){
        localStorage.setItem("idAdmin",this.admin[i].id)
        this.nav.irIndex()
        
      }
    }

    for(let i=0;i<this.admin.length;i++){
      if(this.user[i].email==this.profileForm.get("email")?.value && this.user[i].password==this.profileForm.get("password")?.value){
        localStorage.setItem("idUser",this.user[i].id)
        this.nav.irIndex()

      }
    }
  }

}
