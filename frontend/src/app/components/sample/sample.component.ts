import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from '../../models/sample';

@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {

  @Input()
  sample: Sample;
  
  @Output()
  deleteSample = new EventEmitter();

  delete(): void {
    this.deleteSample.emit(this.sample.id);
  }

}
