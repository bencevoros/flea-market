import { Component, OnInit } from '@angular/core';
import { Sample } from '../../models/sample';
import { Error } from '../../models/error';
import { SampleService } from '../../services/sample.service';

@Component({
  selector: 'app-root',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  sample: Sample | undefined;
  error: Error | undefined;
  sampleValue: Sample = { message: '', title: '' };

  constructor(private sampleService: SampleService) { }

  change(event, key: string): void {
    console.log(event.target.value);
    this.sampleValue[key] = event.target.value.trim();
  }

  getSample(): void {
    this.sampleService.read()
      .subscribe(
        (sampleResp: Sample) => {
          this.error = undefined;
          this.sample = sampleResp;
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  ngOnInit() {
    this.getSample();
  }

  create(event): void {
    event.preventDefault();
    this.error = undefined;

    if (!this.sampleValue.message || !this.sampleValue.title) {
      this.error = new Error('The fields are required!');
      return;
    }

    this.sampleService.create(this.sampleValue)
      .subscribe(
        (sampleResp: Sample) => {
          this.error = undefined;
          this.sample = sampleResp;
          this.sampleValue.title = '';
          this.sampleValue.message = '';
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  delete(): void {
    if (this.sample){
      this.sampleService.delete(this.sample as Sample)
        .subscribe(
          () => {
            this.error = undefined;
            this.sample = undefined;
          },
          (error: Error) => {
            this.error = error;
          }
        );
    }
  }
}
