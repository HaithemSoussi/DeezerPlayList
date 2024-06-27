import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';

const routes: Routes = [
  { path: '', component: PlaylistGridComponent },
  { path: 'playlist/:id', component: PlaylistDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
