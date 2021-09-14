import { RouteInfo } from '../types';
import View from './view';

export default class Router {
  defaultRoute: RouteInfo | null;

  routeTable: RouteInfo[];

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.defaultRoute = null;
    this.routeTable = [];
  }

  go() {
    this.route();
  }

  setDefaultPage(page: View, params: RegExp | null = null): void {
    this.defaultRoute = {
      path: '',
      page,
      params,
    };
  }

  addRoutePath(path: string, page: View, params: RegExp | null = null): void {
    this.routeTable.push({ path, page, params });
  }

  private route() {
    const routePath: string = window.location.hash;

    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
      return;
    }
    this.routeTable.forEach((routeInfo) => {
      if (!routePath.includes(routeInfo.path)) return;

      if (!routeInfo.params) {
        routeInfo.page.render();
        return;
      }

      const parseParams = routePath.match(routeInfo.params);
      if (parseParams) {
        routeInfo.page.render.apply(null, [parseParams[1]]);
      }
    });
  }
}
