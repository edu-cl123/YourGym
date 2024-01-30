import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  login=false
  constructor(public nav: NavService) {}

  ngOnInit() {
    this.login=false
    if(localStorage.getItem("idAdmin")!=null || localStorage.getItem("idUser")!=null ){
      this.login=true;
    }
  }

  }
