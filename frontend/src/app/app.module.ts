import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { SampleComponent } from './components/sample/sample.component';
import { AnotherPageComponent } from './components/another-page/another-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    SampleListComponent,
    AnotherPageComponent,
    MenuComponent,
    MenuItemComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
