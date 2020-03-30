import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AnonymusGuardService } from './services/anonymus-guard.service';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { AnotherPageComponent } from './components/another-page/another-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'samples',
    component: SampleListComponent,
    data: { title: 'Samples' }
  },
  {
    path: 'another',
    component: AnotherPageComponent,
    data: { title: 'Another' },
    canActivate: [AuthGuardService],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { title: 'Registration' },
    canActivate: [AnonymusGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
    canActivate: [AnonymusGuardService],
  },
  { path: '**',
    redirectTo: '/samples',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
