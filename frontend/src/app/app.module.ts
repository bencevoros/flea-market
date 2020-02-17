import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SampleComponent } from './components/sample/sample.component';

@NgModule({
  declarations: [
    SampleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [SampleComponent]
})
export class AppModule { }
