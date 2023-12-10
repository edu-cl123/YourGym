import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(public nav: NavService) {}

  }
