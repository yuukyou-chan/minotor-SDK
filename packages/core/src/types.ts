import { Transport } from './transport';

/**
 * Integration interface
 *
 */
export interface IIntegration {
  init(transport: Transport): void;
}

export class Integration implements IIntegration {
  transport: Transport | null = null;

  constructor(cb: () => void) {}

  init(transport: Transport) {
    this.transport = transport;
  }
}

export interface MonitoringOptions {
  dsn: string;
  integrations: IIntegration[];
}
