import { NewsFeed, NewsDetail } from '../types';

export default class Api {
  ajax: XMLHttpRequest;

  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }

  getRequest<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    this.ajax.open('GET', this.url, false);
    this.ajax.addEventListener('load', () => {
      cb(JSON.parse(this.ajax.response) as AjaxResponse);
    });
    this.ajax.send();
  }

  getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    fetch(this.url)
      .then((res) => res.json())
      .then(cb)
      .catch(() => {
        console.error('데이터를 불러오지 못했습니다');
      });
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getData(cb: (data: NewsFeed[]) => void): void {
    return this.getRequest<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getData(cb: (data: NewsDetail) => void): void {
    return this.getRequest<NewsDetail>(cb);
  }
}
