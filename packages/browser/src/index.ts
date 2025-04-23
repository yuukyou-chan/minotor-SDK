import { Integration, Monitoring } from "@yunshu/monitor-sdk-core";
import { BrowserTransport } from "./transport";

export function init(options: {
  dsn: string;
  integrations: Integration[];
  appKey: string;
}) {
  const monitoring = new Monitoring({
    dsn: options.dsn,
    appKey: options.appKey,
    integrations: options.integrations,
  });

  const transport = new BrowserTransport({
    dsn: options.dsn,
    batchSize: 10,
    appKey: options.appKey,
  });

  monitoring.init(transport);
  return monitoring;
}

/**
 * 使用示例：
 *
 * import { init, Errors, Metrics } from '@yunshu/monitor-sdk-browser'
 *
 * const monitoring = init({
 *    dsn: 'http://localhost:8080/api/v1/monitoring',
 *    integrations: [new Errors(), new Metrics()],
 * })
 */
