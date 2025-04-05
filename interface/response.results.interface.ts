export interface InfoData {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface NextPrev {
  next: number | null;
  prev: number | null;
}

export interface Response {
  info: InfoData;
  results: Array<object>;
}
