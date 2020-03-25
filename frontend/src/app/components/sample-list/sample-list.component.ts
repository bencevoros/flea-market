import { Component, OnInit } from '@angular/core';
import { Sample } from '../../models/sample';
import { Error } from '../../models/error';
import { SampleService } from '../../services/sample.service';

@Component({
  selector: 'sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.scss']
})
export class SampleListComponent implements OnInit {
  samples: Sample[];
  error: Error;
  sampleValue: Sample = { message: '', title: '' };

  constructor(private sampleService: SampleService) { }

  change(event, key: string): void {
    this.sampleValue[key] = event.target.value.trim();
  }

  getSamples(): void {
    console.log('GET SAMPLES');
    this.sampleService.read()
      .subscribe(
        (sampleResp: Sample[]) => {
          console.log(sampleResp)
          this.error = undefined;
          this.samples = sampleResp;
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  ngOnInit() {
    this.getSamples();
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
        () => {
          console.log('ARE YOU SUCCESS?');
          this.sampleValue.title = '';
          this.sampleValue.message = '';

          this.getSamples();
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  delete(id): void {
    console.log(id)
    this.error = undefined;
    const sample = this.samples.find((sample) => sample.id === id);

    if (!sample) {
      this.error = new Error('Sample is not exists!');
      return;
    }

    this.sampleService.delete(sample)
      .subscribe(
        () => {
          this.getSamples();
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }
}
