import express from 'express';
import type { Request, Response, NextFunction, Express } from 'express';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import healthRoutes from './routes/health.routes.js';
import infoRoutes from './routes/info.routes.js';
import authRoutes from './routes/auth.routes.js';
import { register, startMonitoring } from './utils/metrics.js';
import logger from './logger/index.js';
import logRoutes from './utils/logRoutes.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(startMonitoring);
app.use(loggerMiddleware);

app.use('/health', healthRoutes);
app.use('/info', infoRoutes);
app.use('/auth', authRoutes);

app.get('/slow', async (req: Request, res: Response) => {
  const duration = parseInt(req.query.duration as string) || 3000;
  logger.info(`Simulating slow request, ${duration}`);
  await new Promise((resolve) => setTimeout(resolve, duration));
  res.json({ status: 'slow', duration });
});

app.get('/metrics', async (_req, res) => {
  try {
    logger.info('Metrics requested');
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    logger.error(`Error generating metrics: ${err}`);
    res.status(500).end(err);
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled error ${err}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

logRoutes(app);

export default app;
