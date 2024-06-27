import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../models/playlist.model';
import { Track } from '../models/track.model';

@Component({
  selector: 'app-playlist-details',
  standalone: true,
  imports: [],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss'
})
export class PlaylistDetailsComponent implements OnInit {
  playlist!: Playlist;
  tracks: Track[] = [];
  private playlistId!: number;
  private offset = 0;
  private limit = 10;

  constructor(private route: ActivatedRoute, private deezerService: DeezerService) {}

  ngOnInit(): void {
    this.playlistId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlaylistDetails();
    this.loadTracks();
  }

  loadPlaylistDetails(): void {
    this.deezerService.getPlaylistDetails(this.playlistId).subscribe(playlist => {
      this.playlist = playlist;
    });
  }

  loadTracks(): void {
    this.deezerService.getPlaylistTracks(this.playlistId).subscribe(tracks => {
      this.tracks = this.tracks.concat(tracks.slice(this.offset, this.offset + this.limit));
      this.offset += this.limit;
    });
  }

  onScroll(): void {
    this.loadTracks();
  }

  formatDuration(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins}:${secs}`;
  }
}
