import { DocumentData, Timestamp } from "firebase/firestore";

export interface Artist extends DocumentData {
  location: string;
  artistName: string;
  biography: string;
  urlIdentifier: string;
  profileImage?: FileData;
  assets?: FileData[];
  rows?: Row[];
}

export interface PreRegister {
  artistName?: string;
  pressKits?: File[];
  assets?: File[];
}

export interface PostRegister {
  artistName?: string;
  pressKits?: FileData[];
  assets?: FileData[];
}

export interface FileData {
  id: string;
  url: string;
  path: string;
  name: string;
  type: string;
  size: number;
  createdAt: Timestamp;
  lastModified: number;
  thumbnail?: Thumbnail;
}

export interface PdfData {
  pageCount: number;
  thumbnails: string[];
}

// TODO: Might not need indexedDB. Seems to keep track just fine
export interface Row {
  id: string;
  index: number;
  isShown: boolean;
  items?: FileData[];
  name: string;
}

export interface GoogleCity {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

export interface Thumbnail {
  url: string;
  path: string;
}

export enum ElementType {
  SPOTIFY = 'Spotify',
  SOUNDCLOUD = 'Sound Cloud',
  APPLE_MUSIC = 'Apple Music',
  INSTAGRAM = 'Instagram',
  TWITTER = 'Twitter',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  IMAGE = 'Image',
  VIDEO = 'Video',
  AUDIO = 'Audio',
  LINK = 'Link',
  EMBED = 'Embed',
  TEXT = 'Text',
  VOICE = 'Voice',
}