import { EventBus } from "./EventBus";
import { Integration, MonitoringOptions, Transport } from "./type";

export class Monitoring {
  private transport: Transport | null = null;
  private options: MonitoringOptions;
  private eventBus: EventBus;

  constructor(options: MonitoringOptions) {
    this.options = options;
    this.eventBus = new EventBus();
  }

  init(transport: Transport) {
    this.transport = transport;
    this.options.integration.forEach((integration: Integration) => {
      integration.init(transport);
    });
  }

  reportMessage(message: string) {
    this.transport?.send({ type: "message", message });
  }

  on(name: string, callback: Function) {
    this.eventBus.on(name, callback);
  }
}
