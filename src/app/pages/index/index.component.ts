import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../controller/nav.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(public nav: NavService) {
    
  }

  

}
