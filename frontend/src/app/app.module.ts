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
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AnonymusGuardService } from './services/anonymus-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    SampleListComponent,
    AnotherPageComponent,
    MenuComponent,
    MenuItemComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AnonymusGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
