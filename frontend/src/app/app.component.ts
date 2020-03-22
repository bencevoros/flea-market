import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuIsOpen = false;

  changeMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
