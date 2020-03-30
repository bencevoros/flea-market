import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { AnotherPageComponent } from './components/another-page/another-page.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: 'samples',
    component: SampleListComponent,
    data: { title: 'Samples' }
  },
  {
    path: 'another',
    component: AnotherPageComponent,
    data: { title: 'Another' }
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { title: 'Registration' }
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
