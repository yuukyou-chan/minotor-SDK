export interface Transport {
  send(data: Record<string, unknown>): void;
}

export interface IIntegration {
  init(transport: Transport): void;
}

export class Integration implements IIntegration {
  transport: Transport | null = null;

  constructor() {}
  init(transport: Transport): void {
    this.transport = transport;
  }
}

export interface MonitoringOptions {
  dsn: string;
  integration: Integration[];
}
