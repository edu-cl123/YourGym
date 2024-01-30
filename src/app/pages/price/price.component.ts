import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent {
  login: boolean=false;
  constructor(public nav: NavService) {}


  ngOnInit() {
    this.login=false
    if(localStorage.getItem("idAdmin")!=null || localStorage.getItem("idUser")!=null ){
      this.login=true;
    }
  }
}
