import { Integration, Transport } from "@yunshu/monitor-sdk-core";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";
import { debounce, isEmpty } from "lodash-es";

export interface MetricsIntegrationOptions {
  /** 是否监控 LCP (最大内容渲染时间) */
  onLCP?: boolean;
  /** 是否监控 FID (首次输入延迟) */
  onFID?: boolean;
  /** 是否监控 CLS (累积布局偏移) */
  onCLS?: boolean;
  /** 是否监控 FCP (首次内容渲染时间) */
  onFCP?: boolean;
  /** 是否监控 TTFB (首字节时间) */
  onTTFB?: boolean;
  /** 是否上报指标评分 (Good/Needs Improvement/Poor) */
  reportScore?: boolean;
  /** 采样率 (0~1) */
  sampling?: number;
}

export class MetricsIntegration implements Integration {
  constructor(
    public transport: Transport,
    private options: MetricsIntegrationOptions
  ) {
    this.options = {
      onLCP: true,
      onFID: true,
      onCLS: true,
      onFCP: false,
      onTTFB: false,
      reportScore: true,
      sampling: 1,
      ...options,
    };
  }

  init() {
    // 为参数 metrix 显式指定类型，避免隐式 any 类型
    const metricsCallbacks = (metrix: {
      name: string;
      value: number;
      score: string;
    }) => {
      this.transport.send({
        type: "METRICS",
        label: metrix.name,
        value: metrix.value,
        score: metrix.score,
      });
    };
    if (this.options.onLCP) onLCP(metricsCallbacks);
  }
}
