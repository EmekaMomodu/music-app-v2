import {Component, OnInit} from '@angular/core';
import { faCoffee, faRightToBracket, faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', './scss/style.scss']
})
export class LandingComponent implements OnInit {

  faCoffee = faCoffee;
  faRightToBracket = faRightToBracket;
  faMusic = faMusic;

  constructor() { }

  ngOnInit(): void {
  }

}
