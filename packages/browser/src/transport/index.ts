import { Transport } from "@yunshu/monitor-sdk-core";

export class BrowserTransport implements Transport {
  options: {
    batchSize: number;
    dsn: string;
    appKey: string;
  };
  dataQueue: any[] = [];

  constructor(options: Transport["options"]) {
    this.options = options;
  }

  send(data: Record<string, unknown>): Promise<any> {
    return fetch(this.options.dsn, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, appKey: this.options.appKey }),
    }).catch((err) => console.error("Failed to send data", err));
  }

  async immediatelySendBatch() {
    await this.send({ batchData: this.dataQueue });
    this.dataQueue = [];
  }

  batchSend(data: Record<string, unknown>[]): void {
    if (this.dataQueue.length >= this.options.batchSize) {
      this.immediatelySendBatch();
    } else {
      this.dataQueue.push(data);
    }
  }
}
