/**
 * Transport interface
 * 定义传输接口，用于发送数据
 * 为了适配不同客户端，例如浏览器、Node.js 等
 */
export interface Transport {
  options: {
    batchSize: number;
    dsn: string;
    appKey: string;
  };

  dataQueue: any[];
  /**
   * 立即上报：错误、关键行为
   */
  send(data: Record<string, unknown>): void;
  /**
   * 批量上报：性能、用户行为
   */
  batchSend(data: Record<string, unknown>[]): void;
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
  integrations: Integration[];
  appKey: string;
}
