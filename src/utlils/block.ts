import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import EventBus from './eventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  } as Record<string, string>;

  public id = nanoid(4);

  private _element: HTMLElement | null = null;

  protected props: any;

  public children: Record<string, Block>;

  protected refs: Record<string, Block> = {};

  private eventBus: () => EventBus;

  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getPropsAndChildren(propsWithChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: any): any {
    const self = this;

    return new Proxy(props as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldTarget = { ...target };
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  getPropsAndChildren(propsWithChildren: any) {
    const props: any = {};
    const children: any = {};

    Object.entries(propsWithChildren).forEach(([key, val]) => {
      if (val instanceof Block || (Array.isArray(val) && val.every((el) => el instanceof Block))) {
        children[key] = val;
      } else {
        props[key] = val;
      }
    });

    return { props, children };
  }

  _addEvents(): void {
    const { events = {} } = this.props as { events: Record<string, () => void>};
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _removeEvents(): void {
    const { events = {} } = this.props as { events: Record<string, () => void>};
    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount() {}

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // sry about that
  // @ts-ignore
  //  eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  setProps = (nextProps: any): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _render(): void {
    const fragment = this.compile(this.render(), { ...this.props });

    const elWrapper = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(elWrapper);
    }

    this._element = elWrapper;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  protected compile(template: string, context: any): DocumentFragment {
    const fragment = document.createElement('template') as HTMLTemplateElement;

    const tmpl = Handlebars.compile(template);
    fragment.innerHTML = tmpl({ ...context, children: this.children, refs: this.refs });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${component.id}"]`);
      if (!stub) {
        return;
      }
      const content = component.getContent()!;
      stub.replaceWith(content);

      if (stub.childNodes.length) {
        content.append(...stub.childNodes);
      }
    });

    return fragment.content;
  }
}
