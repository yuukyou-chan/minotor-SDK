export class EventBus {
  private events: Record<string, Function[]>;
  constructor() {
    this.events = {};
  }

  on(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName: string, ...args: any[]) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  off(eventName: string, callback?: Function) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }

    if (!callback) {
      delete this.events[eventName];
    }
  }
}
