import Block from './block';

class Route {
  private block: Block | null;

  private props: any;

  private pathname: string;

  private readonly BlockClass: typeof Block;

  constructor(pathname: string, block: typeof Block, props: any) {
    this.block = null;
    this.BlockClass = block;
    this.pathname = pathname;
    this.props = props;
  }

  public match(pathname: string) {
    return this.pathname === pathname;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    this.block = null;
  }

  public render() {
    if (!this.block) {
      this.block = new this.BlockClass();
    }
    const root = document.querySelector(this.props.rootQuery);
    if (!root) {
      throw new Error('No root');
    }
    root.innerHTML = '';
    root.appendChild(this.block.getContent());
  }
}

export default class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: '#root' });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('/404');
      return;
    }
    if (this.currentRoute) {
      this.currentRoute.leave();
    }
    this.currentRoute = route;
    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }
}
// hoc
export interface IWithRouterProps {
  router: Router
}
export function withRouter(Component: typeof Block) {
  return class WithRouter extends Component {
    constructor(props: any) {
      super({ ...props, router: new Router() });
    }
  };
}
