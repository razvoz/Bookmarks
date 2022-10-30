export interface IBookmark {
  readonly id: string,
  url: string,
  title: string,
  description: string,
  type: string,
  immediate: boolean,
  tags: string[],
}

export type TBookmarks = IBookmark[];

export type TTags = string[];