// type for fix rest
type Callback = (...args: Array<unknown>) => void

export default class EventBus {
  private readonly listeners: Record<string, Array<Callback>> = {};

  on(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: Array<unknown>): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
