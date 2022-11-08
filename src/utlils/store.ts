import { set } from './helpers';
import EventBus from './eventBus';
import Block from './block';

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {};

  public getState() {
    return this.state;
  }

  public set(path: string, data: unknown) {
    set(this.state, path, data);
    this.emit(StoreEvents.Updated, this.getState());
  }
}

const store = new Store();

// hoc
export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let prevState: any;
    return class WithStore extends Component {
      constructor(props: any) {
        super({ ...props, ...prevState });
        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          prevState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
