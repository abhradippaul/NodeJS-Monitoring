import promClient from 'prom-client';
import type { Request, Response, NextFunction } from 'express';
import { config } from './config.js';

const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: config.appName
});

// Enable collection of default metrics
promClient.collectDefaultMetrics({ register });

export const httpRequestDuration = new promClient.Histogram({
  name: config.metrics.httpRequestDurationName,
  help: config.metrics.httpRequestDurationHelp,
  labelNames: ["method", "route"]
});

export const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

export function startMonitoring(req: Request, res: Response, next: NextFunction) {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    const route = req.route ? req.route.path : req.path;
    end({ method: req.method, route });
    httpRequestsTotal.inc({ method: req.method, route, status_code: res.statusCode });
  });
  next();
}

export { register };
