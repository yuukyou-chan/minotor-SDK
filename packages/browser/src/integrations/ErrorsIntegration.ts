import { Integration, Transport } from "@yunshu/monitor-sdk-core";
import { getBrowserInfo } from "../utils";
import { BrowserTransport } from "../transport";

export class ErrorsIntegration implements Integration {
  transport: Transport | null = null;

  constructor() {}

  init(transport: Transport) {
    this.transport = transport;

    // js 错误
    window.addEventListener(
      "error",
      (event) => {
        if (event instanceof ErrorEvent) {
          this.transport?.send({
            type: "JS_ERROR",
            message: event.message,
            file: event.filename,
            line: event.lineno,
            column: event.colno,
            stack: event.error?.stack,
            browserInfo: getBrowserInfo(),
          });
        }
      },
      true
    );

    // 资源加载错误
    window.addEventListener(
      "error",
      (event) => {
        const target = event.target as HTMLElement;
        if (target?.tagName) {
          this.transport?.send({
            type: "RESOURCE_ERROR",
            tagName: target.tagName,
            url:
              (target as HTMLImageElement).src ||
              (target as HTMLLinkElement).href,
            browserInfo: getBrowserInfo(),
          });
        }
      },
      true
    );

    // Promise 错误
    window.addEventListener("unhandledrejection", (event) => {
      this.transport?.send({
        type: "PROMISE_ERROR",
        reason: event.reason?.message || String(event.reason),
        browserInfo: getBrowserInfo(),
      });
    });
  }
}
