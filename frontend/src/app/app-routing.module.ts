import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SampleComponent } from './components/sample/sample.component';
import { AnotherPageComponent } from './components/another-page/another-page.component';

const routes: Routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { title: 'Sample' }
  },
  {
    path: 'another',
    component: AnotherPageComponent,
    data: { title: 'Another' }
  },
  { path: '**',
    redirectTo: '/sample',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
