import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeInComponent } from './code-in/code-in.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ParticipantComponent } from './participant/participant/participant.component';


const routes: Routes = [
  {path: '', component: CodeInComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'participant', component: ParticipantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponent = [
  CodeInComponent,
  AdminComponent,
  ParticipantComponent,
]
