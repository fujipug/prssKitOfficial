import { DocumentData } from "firebase/firestore";

export interface Artist extends DocumentData {
  location: string;
  artistName: string;
  biography: string;
  urlIdentifier: string;
  profileImage?: FileData;
  // pressKitElementIndex: number;
  // pressKitElementShown: boolean;
  // pressKits?: PressKit[];
  assets?: FileData[];
  // collections?: Collection[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  url: string;
  path: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
}

// export interface PressKit {
//   imgUrl: string;
//   name: string;
//   lastModified: number;
//   size: number;
//   type: string;
//   path: string;
//   pdf?: PdfData;
//   index?: number;
//   isShown?: boolean;
// }

export interface PdfData {
  pageCount: number;
  thumbnails: string[];
}

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

// export interface ProfileElement {
//   id: string;
//   name: string;
//   type: ElementType;
//   items: FileData[];
//   index: number;
//   isShown: boolean;
//   createdAt: Timestamp;
// }

// export interface Item {
//   id: string;
//   name: string;
//   type: ElementType;
//   index: number;
//   isShown: boolean;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data?: any;
// }

// export interface Collection {
//   id: string;
//   name: string;
//   type: ElementType;
//   createdAt: Timestamp;
//   items: FileData[];
// }

// export interface LinkData {
//   title?: string;
//   url: string;
// }

export enum ElementType {
  SPOTIFY = 'Spotify',
  SOUNDCLOUD = 'Sound Cloud',
  APPLE_MUSIC = 'Apple Music',
  INSTAGRAM = 'Instagram',
  TWITTER = 'Twitter',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  PRESS_KIT = 'PressKits',
  COLLECTION = 'Collection',
  IMAGE = 'Image',
  VIDEO = 'Video',
  AUDIO = 'Audio',
  LINK = 'Link',
  EMBED = 'Embed',
  TEXT = 'Text',
}