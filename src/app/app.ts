import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongViewer } from './song-viewer/song-viewer'; // <-- Import it here

@Component({
  selector: 'app-root',
  imports:[RouterOutlet, SongViewer], // <-- Add to imports array
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('song_chords_VN');
}