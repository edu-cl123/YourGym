import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../controller/nav.service';
import { CommonModule } from '@angular/common';  


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  login:boolean=false;
  constructor(public nav: NavService) {
    
  }
  
  ngOnInit() {
    this.login=false
    if(localStorage.getItem("idAdmin")!=null || localStorage.getItem("idUser")!=null ){
      this.login=true;
    }
  }


}
