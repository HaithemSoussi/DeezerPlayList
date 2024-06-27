import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { PlaylistDetailsComponent } from './playlist-details.component';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../models/playlist.model';
import { Track } from '../models/track.model';

describe('PlaylistDetailsComponent', () => {
  let component: PlaylistDetailsComponent;
  let fixture: ComponentFixture<PlaylistDetailsComponent>;
  let deezerService: DeezerService;
  let mockPlaylist: Playlist;
  let mockTracks: Track[];

  beforeEach(async () => {
    mockPlaylist = {
      id: 1,
      title: 'Test Playlist',
      picture: 'url',
      duration: 7200,
      creator: { name: 'Test User' },
    };

    mockTracks = [
      {  title: 'Track 1', artist: { name: 'Artist 1' }, duration: 300 },
      {  title: 'Track 2', artist: { name: 'Artist 2' }, duration: 250 },
    ];

    await TestBed.configureTestingModule({
      declarations: [PlaylistDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        DeezerService,
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { params: { id: 1 } } } 
        }
      ],
    })
    .compileComponents();

    deezerService = TestBed.inject(DeezerService);
    spyOn(deezerService, 'getPlaylistDetails').and.returnValue(of(mockPlaylist));
    spyOn(deezerService, 'getPlaylistTracks').and.returnValue(of(mockTracks));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load playlist details on init', () => {
    expect(component.playlist).toEqual(mockPlaylist);
  });

  it('should load playlist tracks on init', () => {
    expect(component.tracks.length).toBe(2);
    expect(component.tracks).toEqual(mockTracks);
  });

  it('should display playlist details correctly', () => {
    const headerElement = fixture.debugElement.query(By.css('.playlist-header'));
    expect(headerElement.nativeElement.textContent).toContain('Test Playlist');
    expect(headerElement.nativeElement.textContent).toContain('Test User');
    expect(headerElement.nativeElement.textContent).toContain('2:0:0'); // formatted duration
  });

  it('should display tracks correctly', () => {
    const trackElements = fixture.debugElement.queryAll(By.css('.track-item'));
    expect(trackElements.length).toBe(2);
    expect(trackElements[0].nativeElement.textContent).toContain('Track 1');
    expect(trackElements[0].nativeElement.textContent).toContain('Artist 1');
    expect(trackElements[0].nativeElement.textContent).toContain('0:5:0'); // formatted duration
    expect(trackElements[1].nativeElement.textContent).toContain('Track 2');
    expect(trackElements[1].nativeElement.textContent).toContain('Artist 2');
    expect(trackElements[1].nativeElement.textContent).toContain('0:4:10'); // formatted duration
  });

  it('should lazy load more tracks on scroll', () => {
    const initialTrackCount = component.tracks.length;
    component.onScroll();
    fixture.detectChanges();
    expect(component.tracks.length).toBeGreaterThan(initialTrackCount);
  });
});
