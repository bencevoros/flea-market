import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuIsOpen: boolean;
  @Output() changeMenuEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeMenuClick() {
    this.changeMenuEvent.emit();
  }
}
