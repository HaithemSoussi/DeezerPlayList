import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../models/playlist.model';

describe('DeezerService', () => {
  let service: DeezerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeezerService]
    });
    service = TestBed.inject(DeezerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch playlists', () => {
    const dummyPlaylists: Playlist[] = [
      { id: 1, title: 'Playlist 1', picture: '', duration: 3600, creator: { name: 'User 1' } }
    ];

    service.getUserPlaylists().subscribe(playlists => {
      expect(playlists.length).toBe(1);
      expect(playlists).toEqual(dummyPlaylists);
    });

    const req = httpMock.expectOne('https://api.deezer.com/user/5/playlists');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPlaylists);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
