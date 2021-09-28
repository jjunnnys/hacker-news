import View from '../core/view';

export interface NewsStore {
  getAllFeeds(): NewsFeed[];
  getFeed(position: number): NewsFeed;
  setFeeds(feeds: NewsFeed[]): void;
  makeRead(id: number): void;
  hasFeeds: boolean;
  currentPage: number;
  numberOfFeed: number;
  nextPage: number;
  prevPage: number;
}

export type News = {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
};

export type NewsFeed = News & {
  readonly points: number;
  readonly comments_count: number;
  read?: boolean;
};

export type NewsComment = News & {
  readonly comments: NewsComment[];
  readonly level: number;
};

export type NewsDetail = News & {
  readonly comments: NewsComment[];
};

export type RouteInfo = {
  path: string;
  page: View;
  params: RegExp | null;
};

export type Store = {
  feeds: NewsFeed[];
  currentPage: number;
};
