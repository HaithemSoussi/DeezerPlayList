import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  private userId = 5;

  constructor(private http: HttpClient) {}

  getUserPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`https://api.deezer.com/user/${this.userId}/playlists`);
  }

  getPlaylistDetails(playlistId: number): Observable<Playlist> {
    return this.http.get<Playlist>(`https://api.deezer.com/playlist/${playlistId}`);
  }

  getPlaylistTracks(playlistId: number): Observable<Track[]> {
    return this.http.get<Track[]>(`https://api.deezer.com/playlist/${playlistId}/tracks`);
  }
}
