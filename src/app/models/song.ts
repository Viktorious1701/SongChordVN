export interface Song {
  id: string;
  title: string;
  artist: string;
  key?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  content: string;
}