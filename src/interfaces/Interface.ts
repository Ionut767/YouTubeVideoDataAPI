import { URL } from "url";

export interface selectedDataInterface {
  type?: string | undefined;
  videoId?: string | undefined;
  url?: URL | undefined;
  title?: string | undefined;
  description?: string | undefined;
  image?: URL | undefined;
  thumbnail?: URL | undefined;
  duration?:
    | {
        seconds: number | undefined;
        timestamp?: string | undefined;
      }
    | undefined;
  ago?: string | undefined;
  views?: number | undefined;
  author?:
    | {
        name?: string | undefined;
        URL?: URL | undefined;
      }
    | undefined;
}
