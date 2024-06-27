import { Component, OnInit } from '@angular/core';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../models/playlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-grid',
  standalone: true,
  imports: [],
  templateUrl: './playlist-grid.component.html',
  styleUrl: './playlist-grid.component.scss'
})

export class PlaylistGridComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private deezerService: DeezerService, private router: Router) {}

  ngOnInit(): void {
    this.deezerService.getUserPlaylists().subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  goToPlaylistDetails(playlistId: number): void {
    this.router.navigate(['/playlist', playlistId]);
  }
}
