import { Component } from '@angular/core';
import { NavService } from '../../controller/nav.service';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent {
  constructor(public nav: NavService) {}

}
