import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Song } from '../models/song';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-song-viewer',
  imports: [FormsModule],   // <-- add this
  templateUrl: './song-viewer.html',
  styleUrl: './song-viewer.css',
})
export class SongViewer implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  song: Song | null = null;
  parsedLines: { chord: string; text: string }[][] = [];
  safeYoutubeUrl: SafeResourceUrl | null = null;

  // Auto-scroll state
  isScrolling = false;
  scrollSpeed = 2;
  private scrollInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.http.get<Song[]>('/songs.json').subscribe((songs) => {
      this.song = songs[0];

      if (this.song.youtubeUrl && this.song.youtubeUrl.trim() !== '') {
        this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.song.youtubeUrl
        );
      }

      this.parseContent(this.song.content);
    });
  }

  ngOnDestroy() {
    this.stopScroll();
  }

  toggleScroll() {
    this.isScrolling = !this.isScrolling;
    if (this.isScrolling) {
      this.startScroll();
    } else {
      this.stopScroll();
    }
  }

  private startScroll() {
    this.scrollInterval = setInterval(() => {
      window.scrollBy({ top: this.scrollSpeed, behavior: 'instant' });
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.isScrolling = false;
        this.stopScroll();
      }
    }, 50);
  }

  private stopScroll() {
    if (this.scrollInterval !== null) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  parseContent(content: string) {
    this.parsedLines = content.split('\n').map((line) => {
      if (!line.trim()) return [];
      const parts = line.split('[');
      const segments = [];
      if (parts[0]) segments.push({ chord: '', text: parts[0] });
      for (let i = 1; i < parts.length; i++) {
        const [chord, ...textArr] = parts[i].split(']');
        segments.push({ chord, text: textArr.join(']') });
      }
      return segments;
    });
  }
}